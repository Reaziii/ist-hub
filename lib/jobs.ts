import JobModel from "@/models/JobModel";
import MongoConn from "./mongodb"
import JobTagModel from "@/models/JobTagModel";
import { user } from "./user";
import { ErrorMessage } from "@/constants";


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
            userid: usr.usr._id
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
        job.title = params.title;
        job.company = params.company;
        job.company_email = params.company_email;
        job.website = params.website;
        job.address = params.address;
        job.description = params.description;
        job.type = params.type;
        job.userid = usr.usr._id;
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

export const deleteJob = async (job_id: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        await MongoConn();
        let job = await JobModel.findById(job_id);
        if (!job || job.userid !== usr.usr._id) {
            return ErrorMessage.UNAUTHORIZED
        }
        await job.deleteOne();
        return { success: true, msg: "Job deleted successfully" }
    } catch (err) {
        console.log("delete job failed ===> \n", err)
        return { success: false, msg: "Failed to delete the job" }
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

export const getProfileJobs = async (userid: string): Promise<ServerMessageInterface & { jobs: JobInterface[] }> => {
    "use server"
    try {
        await MongoConn();
        let jobs = await JobModel.find({ userid }).lean();
        for (let i = 0; i < jobs.length; i++) {
            jobs[i].tags = await JobTagModel.find({ job_id: jobs[i]._id }).lean();
            jobs[i].tags = jobs[i].tags.map((item) => ({ ...item, _id: String(item._id) }));
            jobs[i]._id = String(jobs[i]._id)
        }
        return { success: true, msg: "Jobs fetched succesfully", jobs }
    } catch (err) {
        return { success: false, msg: "failed to fetch jobs", jobs: [] }
    }
}