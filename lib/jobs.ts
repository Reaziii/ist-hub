import JobModel from "@/models/JobModel";
import MongoConn from "./mongodb"
import JobTagModel from "@/models/JobTagModel";
import { user } from "./user";
import { EmployeeType, ErrorMessage } from "@/constants";
import UserModel from "@/models/UserModel";
import { PipelineStage } from "mongoose";


export const createNewJob = async (params: JobInterface): Promise<ServerMessageInterface & { job_id?: string }> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        await MongoConn();

        let job = new JobModel({
            title: params.title,
            company: params.company,
            company_email: params.company_email,
            website: params.website,
            address: params.address,
            description: params.description,
            type: params.type,
            userid: usr.usr._id,
            isActive: params.isActive
        })
        await job.save();
        for (let i = 0; i < params.tags.length; i++) {
            let tag = new JobTagModel({
                tag: params.tags[i].tag,
                job_id: job._id
            })
            await tag.save();
        }
        return { success: true, msg: "Job created successfully", job_id: String(job._id) }
    } catch (err) {
        console.log("creating job error ===> \n", err);
        return { success: false, msg: "Failed to create the job" }

    }
}


export const updateJob = async (params: JobInterface): Promise<ServerMessageInterface & { job_id?: string }> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        await MongoConn();
        let job = await JobModel.findById(params._id);
        if (!job || job.userid !== usr.usr._id) {
            return ErrorMessage.UNAUTHORIZED
        }
        console.log(params)
        job.title = params.title;
        job.company = params.company;
        job.company_email = params.company_email;
        job.website = params.website;
        job.address = params.address;
        job.description = params.description;
        job.type = params.type;
        job.userid = usr.usr._id;
        job.isActive = params.isActive
        await job.save();
        await JobTagModel.deleteMany({ job_id: job._id })
        for (let i = 0; i < params.tags.length; i++) {
            let tag = new JobTagModel({
                tag: params.tags[i].tag,
                job_id: job._id
            })
            await tag.save();
        }
        return { success: true, msg: "Job update successfully", job_id: String(job._id) }
    } catch (err) {
        console.log("updating job error ===> \n", err);
        return { success: false, msg: "Failed to update the job" }

    }
}



export const getJobDetails = async (job_id: string): Promise<ServerMessageInterface & { job?: JobInterface }> => {
    "use server"
    try {
        await MongoConn();
        let job = await JobModel.findById(job_id).lean();
        if (!job) {
            return { success: false, msg: "Job not found" }
        }
        job.tags = await JobTagModel.find({ job_id: job_id }).lean();
        job.tags = job.tags.map((item) => ({ ...item, _id: String(item._id) }));
        job._id = String(job._id)
        return { success: true, msg: "Job fetched successfully", job }
    } catch (err) {
        console.log("feting job failed ===> \n", err)
        return { success: false, msg: "Failed to fetch job detailis" }
    }
}

export const getProfileJobs = async (userid: string): Promise<ServerMessageInterface & { jobs: JobInterface[], username: string, fullname: string }> => {
    "use server"
    try {
        await MongoConn();
        const user = await UserModel.findById(userid);
        if (!user) {
            return { success: false, msg: "User not found", jobs: [], username: "", fullname: "" }
        }
        let jobs = await JobModel.find({ userid }).lean();
        for (let i = 0; i < jobs.length; i++) {
            jobs[i].tags = await JobTagModel.find({ job_id: jobs[i]._id }).lean();
            jobs[i].tags = jobs[i].tags.map((item) => ({ ...item, _id: String(item._id) }));
            jobs[i]._id = String(jobs[i]._id)
        }
        return { success: true, msg: "Jobs fetched succesfully", jobs, username: user.username, fullname: user.fullname }
    } catch (err) {
        return { success: false, msg: "failed to fetch jobs", jobs: [], username: "", fullname: "" }
    }
}

export const deleteJob = async (job_id: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let job = await JobModel.findById(job_id);
        if (!job || job.userid !== usr.usr._id) {
            return ErrorMessage.UNAUTHORIZED;
        }
        await JobTagModel.deleteMany({ job_id })
        await job.deleteOne();
        return { success: true, msg: "Job deleted successfully" }
    } catch (err) {
        console.log("deleting job ===> \n", err)
        return { success: false, msg: "Failed to delete job" }
    }
}




export const getPaginatedJobs = async (page: number = 1, limit: number = 10): Promise<ServerMessageInterface & { jobs: JobInterfaceWithUserData[] }> => {
    "use server"
    try {
        await MongoConn()
        const skip = (page - 1) * limit;
        const jobs = await JobModel.find({
            isActive: true
        })
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit)
            .lean();

        for (let i = 0; i < jobs.length; i++) {
            jobs[i].tags = await JobTagModel.find({ job_id: jobs[i]._id }).lean();
            jobs[i].tags = jobs[i].tags.map((item) => ({ ...item, _id: String(item._id) }));
            jobs[i]._id = String(jobs[i]._id)
        }

        let ret: JobInterfaceWithUserData[] = [];
        for (let i = 0; i < jobs.length; i++) {
            let user = await UserModel.findById(jobs[i].userid);
            if (!user) throw "";
            ret[i] = {
                ...jobs[i],
                username: user.username,
                fullname: user.fullname
            }
        }



        return { success: true, msg: "retrived jobs", jobs: ret };
    } catch (error) {
        console.error('Error fetching paginated jobs:', error);
        return { success: false, msg: "Failed to retrive", jobs: [] }
    }
};


export const searchJobs = async (tags: string[], type: string): Promise<ServerMessageInterface & { jobs: any[] }> => {
    "use server"
    try {
        // console.log("[searching...]")
        // await MongoConn();
        // let pipeline: PipelineStage[] = []
        // pipeline.push({
        //     $match: {
        //         isActive: true,
        //         type: type
        //     }
        // })
        // pipeline.push({
        //     $addFields: {
        //         "id": { $toString: "$_id" }
        //     }
        // })
        // pipeline.push(
        //     {
        //         $lookup: {
        //             from: 'jobtags',
        //             localField : "id",
        //             foreignField : "job_id",
        //             as: 'tags',

        //             pipeline : [
        //                 {
        //                     $unwind : "$tags"
        //                 },
        //                 {
        //                     $group : {
        //                         $tags: { $push : "$tag"}
        //                     }
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         $project: {
        //             title: 1,
        //             description: 1,
        //             tags: 1 // Extract the 'tags' array from the object
        //         }
        //     }
        // )

        // let jobs = await JobModel.aggregate<any[]>(pipeline);
        // jobs = jobs.map(item=>({...item,_id : String(item._id)}))
        // return {success : true, msg : "asdfasdf", jobs}
    } catch (err) {
        console.log(err);
        console.log("search failed")

    }

    return { success: false, msg: "Failed to retrive", jobs: [] }
}