import { ErrorMessage } from "@/constants";
import MongoConn from "../mongodb";
import { cloudinaryImageUploadMethod } from "../upload";
import { Admin } from "./auth";
import AdminUserModel from "@/models/AdminUserModel";
import AdminActivitieModel from "@/models/AdminActivitieModel";
import { time } from "console";


export const UploadProfilePicture = async (form: FormData): Promise<ServerMessageInterface & { img?: string }> => {
    "use server"
    try {
        let admin = await Admin();
        if (!admin.admin) {
            return ErrorMessage.UNAUTHORIZED
        }
        await MongoConn();
        let _admin = await AdminUserModel.findById(admin.admin._id);
        if (!_admin) return ErrorMessage.UNAUTHORIZED;
        let img = form.get("img") as File | null | undefined;
        if (!img) {
            return { success: false, msg: "Image is required" }
        }
        let buffer = Buffer.from(await img.arrayBuffer())
        let data = await cloudinaryImageUploadMethod(buffer)
        if (!data.success || !data.url) {
            return { success: false, msg: data.msg ?? "Failed to upload" };
        }

        _admin.photo = data.url;
        await _admin.save();

        return { success: true, msg: "Profile picture changed successfully", img: data.url }


    } catch (err) {
        console.log("Admin profile picture upload failed ===> \n", err)
        return { success: false, msg: "Failed to upload" }

    }
}

export const getProfileDetails = async (id?: string): Promise<ServerMessageInterface & { admin?: AdminUserInterface }> => {
    "use server"
    try {
        if (!id) {
            let admin = await Admin();
            if (!admin.admin) {
                return ErrorMessage.UNAUTHORIZED;
            }
            return { success: true, msg: "Admin retrived successfully", admin: admin.admin }
        }
        else {
            let admin = await AdminUserModel.findById(id);
            if (!admin) return { success: false, msg: "Admin doesn't exists" }
            admin._id = String(admin._id)
            return { success: true, msg: "Admin retrived successfully", admin }
        }
    } catch (err) {
        return { success: false, msg: "Failed to retrived" }
    }
}

export const updateProfile = async (params: AdminUserInterface): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let admin = await Admin();
        if (!admin.admin) return ErrorMessage.UNAUTHORIZED;
        let _admin = await AdminUserModel.findById(admin.admin._id);
        if (!_admin) return ErrorMessage.UNAUTHORIZED;
        _admin.name = params.name;
        _admin.phone = params.phone;
        await _admin.save();
        return { success: true, msg: "Profile updated successfully" }
    } catch (err) {
        console.log("Admin profile update failed ===> \n", err);
        return { success: false, msg: "Failed to update profile" }
    }


}

export const getActivities = async (adminid?: string): Promise<ServerMessageInterface & { activities: ActivitiesInterface[] }> => {
    "use server"
    try {
        let admin = await Admin();
        if (!admin.admin) return { ...ErrorMessage.UNAUTHORIZED, activities: [] };
        if (adminid) {
            let activities = await AdminActivitieModel.find({ userid: adminid }).sort({ time: 1 }).lean();
            return { success: true, msg: "Activities retrived", activities: activities.map((item => ({ ...item, _id: String(item._id) }))) }
        }
        let activities = await AdminActivitieModel.find({ userid: admin.admin._id }).sort({ time: -1 }).lean();
        return { success: true, msg: "Activities retrived", activities: activities.map((item => ({ ...item, _id: String(item._id) }))) }

    } catch (err) {
        return { success: false, msg: "Failed to retrive activities", activities: [] }
    }
}