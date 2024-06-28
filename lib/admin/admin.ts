import { ErrorMessage } from "@/constants";
import MongoConn from "../mongodb";
import { cloudinaryImageUploadMethod } from "../upload";
import { Admin } from "./auth";
import AdminUserModel from "@/models/AdminUserModel";
import AdminActivitieModel from "@/models/AdminActivitieModel";


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

export const deActivateAccount = async (userid?: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let admin = await Admin();
        if (!admin.admin) return ErrorMessage.UNAUTHORIZED;
        let _admin = await AdminUserModel.findById(userid ? userid : admin.admin._id);
        if (!_admin) return ErrorMessage.UNAUTHORIZED;
        if (_admin.invitedBy === "owner") {
            return { success: false, msg: "You can't deactivate this account!" }
        }
        _admin.isActive = false;
        await _admin.save();
        return { success: true, msg: "You have deactivated the account!" + (userid ? "" : " to reactive please contuct other admins") }
    } catch (err) {
        console.log("deactive admin account failed ===> \n", err);
        return { success: false, msg: "Failed to deactive admin account" }
    }
}


export const getAdminUsers = async (): Promise<ServerMessageInterface & { admins: (AdminUserInterface & { invitedAdmin: string })[] }> => {
    "use server";
    try {
        let _admin = await Admin();
        if (!_admin.admin) return { success: false, msg: "You are not authorized", admins: [] }
        let admins = await AdminUserModel.find().lean();
        let ret: (AdminUserInterface & { invitedAdmin: string })[] = [];
        for (let i = 0; i < admins.length; i++) {
            if (!admins[i].updated) continue;
            let inv = (admins.filter(item => (String(item._id) === admins[i].invitedBy)));
            let email: string = "Root Admin";
            if (inv.length > 0) email = inv[0].email;
            ret.push({
                ...admins[i],
                password: "",
                invitedAdmin: email,
                _id: String(admins[i]._id)
            })
        }
        return { success: true, msg: "Admin retrived", admins: ret }

    } catch (err) {
        console.log("Failed to retrive admins ===> \n", err);
        return { success: false, msg: "Failed to retrive admins", admins: [] }
    }
}

export const toggleAdminActive = async (adminid: string): Promise<ServerMessageInterface & { isMe?: boolean }> => {
    "use server";
    try {
        let admin = await Admin();
        if (!admin.admin) return ErrorMessage.UNAUTHORIZED;
        let _admin = await AdminUserModel.findById(adminid);
        if (!_admin) return { success: false, msg: "Admin doesn't exists" }
        if (_admin.invitedBy === "owner") return { success: false, msg: "Can't toggle root user" }
        _admin.isActive = !_admin.isActive;
        let title = "Activated";
        if (_admin.isActive === false) title = "Deactivated"
        let activity = new AdminActivitieModel({
            title: `${title} an admin account`,
            message: `${title} an admin account. Account email - ${_admin.email}`,
            time: new Date(),
            userid: admin.admin._id
        })
        await _admin.save();
        await activity.save();
        return { success: true, msg: "Admin updated successfully", isMe: (adminid === admin.admin._id) }
    } catch (err) {
        return { success: false, msg: "Failed to update admin" }
    }
}