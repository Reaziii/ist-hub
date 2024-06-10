import JobModel from "@/models/JobModel";
import MongoConn from "./mongodb"
import JobTagModel from "@/models/JobTagModel";
import { user } from "./user";
import { ErrorMessage } from "@/constants";
import UserModel from "@/models/UserModel";
import { PipelineStage } from "mongoose";
import JobWhitelistModel from "@/models/JobWhitelistModel";


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
            isActive: params.isActive,
            expiredAt: params.expiredAt
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
        job.isActive = params.isActive
        job.expiredAt = params.expiredAt
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



export const getJobDetails = async (job_id: string): Promise<ServerMessageInterface & { job?: JobInterface, whitelisted?: boolean }> => {
    "use server"
    try {
        await MongoConn();
        let usr = await user();
        let job = await JobModel.findById(job_id).lean();
        if (!job) {
            return { success: false, msg: "Job not found" }
        }
        job.tags = await JobTagModel.find({ job_id: job_id }).lean();
        job.tags = job.tags.map((item) => ({ ...item, _id: String(item._id) }));
        job._id = String(job._id)
        let isWhitelisted = false;
        if (usr.usr) {
            isWhitelisted = (await JobWhitelistModel.findOne({ userid: usr.usr._id, job_id })) ? true : false
        }
        return { success: true, msg: "Job fetched successfully", job, whitelisted: isWhitelisted }
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

export const toggleJobWhitelist = async (job_id: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let whitelist = await JobWhitelistModel.findOne({ userid: usr.usr._id, job_id });
        if (whitelist) {
            await whitelist.deleteOne();
            return { success: true, msg: "Removed job from whitelist" }
        }
        let newWhitelist = new JobWhitelistModel({
            job_id,
            userid: usr.usr._id
        });
        await newWhitelist.save();
        return { success: true, msg: "Job added to whitelist" }
    } catch (err) {
        console.log("job adding whitelist error ===> \n", err)
        return { success: false, msg: "Failed to add to whitelist" }
    }
}


export const getPaginatedJobs = async (page: number = 1, limit: number = 10): Promise<ServerMessageInterface & { jobs: JobInterfaceWithUserData[] }> => {
    "use server"
    try {
        await MongoConn()
        let usr = await user();
        const skip = (page - 1) * limit;
        const jobs = await JobModel.find({
            isActive: true,
            expiredAt: {
                $gte: new Date()
            }
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
                fullname: user.fullname,
                whitelisted: false
            }
            if (usr.usr) {
                ret[i].whitelisted = (await JobWhitelistModel.findOne({ job_id: jobs[i]._id, userid: usr.usr._id })) ? true : false;

            }
        }
        return { success: true, msg: "retrived jobs", jobs: ret };
    } catch (error) {
        console.error('Error fetching paginated jobs:', error);
        return { success: false, msg: "Failed to retrive", jobs: [] }
    }
};

export const getWhitelistedJobs = async (page: number = 1, limit: number = 10000): Promise<ServerMessageInterface & { jobs: JobInterfaceWithUserData[] }> => {
    "use server"
    try {
        await MongoConn()
        let usr = await user();
        if (!usr.usr) return { ...ErrorMessage.UNAUTHORIZED, jobs: [] }
        const skip = (page - 1) * limit;
        let whitelisted = (await JobWhitelistModel.find({ userid: usr.usr._id })).map(item => item.job_id)
        const jobs = await JobModel.find({
            isActive: true,
            _id: { $in: whitelisted },
            expiredAt: {
                $gte: new Date()
            }
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
                fullname: user.fullname,
                whitelisted: false
            }
            if (usr.usr) {
                ret[i].whitelisted = (await JobWhitelistModel.findOne({ job_id: jobs[i]._id, userid: usr.usr._id })) ? true : false;

            }
        }
        return { success: true, msg: "retrived jobs", jobs: ret };
    } catch (error) {
        console.error('Error fetching paginated jobs:', error);
        return { success: false, msg: "Failed to retrive", jobs: [] }
    }
};


export const searchJobs = async (tags: string[], type: string): Promise<ServerMessageInterface & { jobs: JobInterfaceWithUserData[] }> => {
    "use server"
    try {
        await MongoConn();
        let usr = await user();
        let pipeline: PipelineStage[] = []
        pipeline.push({
            $match: {
                isActive: true,
                type: type
            }
        })
        pipeline.push({
            $addFields: {
                "id": { $toString: "$_id" }
            }
        })
        pipeline.push(
            {
                $lookup: {
                    from: 'jobtags',
                    "localField": "id",
                    "foreignField": "job_id",
                    pipeline: [
                        {
                            $addFields: {
                                "name": {
                                    "$toLower": "$tag"
                                }
                            }
                        }
                    ],
                    as: 'tags',

                },
            },
            {
                "$addFields": {
                    "tagItems": "$tags.name",
                    "_userid": {
                        $toObjectId: "$userid"
                    }
                }
            },
            {
                $addFields: {
                    shouldMatch: {
                        $setIsSubset: [tags, "$tagItems"]
                    }
                }
            },
            {
                $match: {
                    shouldMatch: true
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_userid",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $addFields: {
                    username: "$user.username",
                    fullname: "$user.fullname",
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    tagItems: 1,
                    shouldMatch: 1,
                    username: 1,
                    fullname: 1,
                    userid: 1,
                    company: 1,
                    company_email: 1,
                    website: 1,
                    type: 1,
                    tags: 1,
                    address: 1,
                    isActive: 1,
                    createdAt: 1,
                    updatedAt: 1,
                }
            }
        )

        let jobs = await JobModel.aggregate<JobInterfaceWithUserData>(pipeline);
        for (let i = 0; i < jobs.length; i++) {
            jobs[i]._id = String(jobs[i]._id);
            for (let j = 0; j < jobs[i].tags.length; j++) {
                jobs[i].tags[j]._id = String(jobs[i].tags[j]._id)
            }
            jobs[i].whitelisted = false;
            if (usr.usr) {
                jobs[i].whitelisted = (await JobWhitelistModel.findOne({ job_id: jobs[i]._id, userid: usr.usr._id })) ? true : false;
            }
        }
        return { success: true, msg: "asdfasdf", jobs }
    } catch (err) {
        console.log("job searching error ===>\n", err);

    }

    return { success: false, msg: "Failed to retrive", jobs: [] }
}


