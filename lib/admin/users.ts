import UserModel from "@/models/UserModel";
import { Admin, currentPath } from "./auth";
import { ErrorMessage } from "@/constants";
import { UserSearchParams } from "@/app/admin/users/SearchBar";
import { PipelineStage } from "mongoose";
import AdminActivitieModel from "@/models/AdminActivitieModel";
import JobModel from "@/models/JobModel";
import EducationModel from "@/models/EducationModel";
import ExperienceModel from "@/models/ExperienceModel";
import JobWhitelistModel from "@/models/JobWhitelistModel";
import SkillModel from "@/models/SkillModel";
import UserVerifier from "@/models/UserVerifier";
import MongoConn from "../mongodb";
import { signNewToken } from "../auth";


export const getAllUsers = async (page: number, params?: UserSearchParams): Promise<ServerMessageInterface & { users: UserInterface[] }> => {
    "use server";
    try {

        let admin = await Admin();
        if (!admin.admin) {
            return { ...ErrorMessage.UNAUTHORIZED, users: [] };
        }
        let pipeline: PipelineStage[] = [];
        if (params && params.batch.length) {
            pipeline.push({
                $match: {
                    batch: Number(params.batch)
                }
            })
        }
        if (params && params.dept !== "ALL") {
            pipeline.push({
                $match: {
                    department: params.dept
                }
            })
        }
        if (params && params.roll.length) {
            pipeline.push({
                $match: {
                    roll_no: Number(params.roll)
                }
            })
        }
        if (params && params.verified !== "ALL") {
            pipeline.push({
                $match: {
                    verified: params.verified === "YES"
                }
            })
        }
        const skip = (page - 1) * 10;

        let users: UserInterface[] = [];
        if (pipeline.length === 0) {
            users = await UserModel.find().lean()
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(10)
                .lean();
        }
        else {
            users = await UserModel.aggregate<UserInterface>(pipeline)
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(10)
        }
        users = users.map(item => ({ ...item, _id: String(item._id), password: "" }))
        return { success: true, msg: "Successfully fetched users", users: users }
    } catch (err) {
        console.log("admin - user fetch failed ===> \n", err)
        return { success: false, msg: "Failed to fetch users", users: [] }

    }
}

export const deleteAnUser = async (userid: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let _admin = await Admin();
        if (!_admin.admin) return ErrorMessage.UNAUTHORIZED;
        let user = await UserModel.findById(userid);
        if (!user) {
            return { success: false, msg: "User doesn't exists" }
        }
        let activity = new AdminActivitieModel({
            title: "An user deleted",
            message: `Roll - ${user.roll_no} from batch ${user.batch} has been deleted`,
            userid: _admin.admin._id,
            time: new Date()
        })
        await user.deleteOne();
        await JobModel.deleteMany({ userid })
        await EducationModel.deleteMany({ userid });
        await ExperienceModel.deleteMany({ userid });
        await JobWhitelistModel.deleteMany({ userid });
        await SkillModel.deleteMany({ userid });
        await activity.save();
        return { success: true, msg: "User deleted successfully" }
    } catch (err) {
        console.log("admin - user deletation failed ===> \n", err);
        return { success: false, msg: "Failed to delete user" }
    }
}

export const toogleVerified = async (userid: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let _admin = await Admin();
        if (!_admin.admin) return ErrorMessage.UNAUTHORIZED;
        let user = await UserModel.findById(userid);
        if (!user) {
            return { success: false, msg: "User doesn't exists" }
        }
        let text = "verified";
        if (user.verified) text = "unverified"
        let activity = new AdminActivitieModel({
            title: "An user verified",
            message: `Roll - ${user.roll_no} from batch ${user.batch} has been ${text}`,
            userid: _admin.admin._id,
            time: new Date()
        })
        user.verified = !user.verified;
        let verifier = await UserVerifier.findOne({ owner: userid });
        if (!verifier) {
            verifier = new UserVerifier({
                owner: userid,
                verifiedAt: new Date(),
                verfier: _admin.admin._id
            })
        }
        verifier.verfier = _admin.admin._id;
        await verifier.save();
        await user.save();
        await activity.save();
        return { success: true, msg: "User text successfully" }
    } catch (err) {
        console.log("admin - user verification failed ===> \n", err);
        return { success: false, msg: "Failed to verify user" }
    }
}

export const impersonateLogin = async (userid: string): Promise<ServerMessageInterface & { link?: string }> => {
    "use server";
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) {
            return ErrorMessage.UNAUTHORIZED
        }

        let user = await UserModel.findById(userid).lean();
        if (!user) {
            return { success: false, msg: "User doesn't exists" };
        }
        await signNewToken(user.email);
        let link = await currentPath();
        link = `/profile/${user.username}`;
        let activity = new AdminActivitieModel({
            userid: admin.admin._id,
            title: "Started impersonating",
            time : new Date(),
            message: `Admin has started impersonating to <a target="_blank" href="${await currentPath()}/profile/${user.username}">${user.fullname}</a>`
        })
        await activity.save();
        return { success: true, msg: "Successfully loggedin", link }
    } catch (err) {
        console.log("failed to impersonate login ===> \n", err);
        return { success: false, msg: "Failed to impoersontate" }
    }
}