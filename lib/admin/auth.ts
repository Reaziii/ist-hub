import AdminUserModel from "@/models/AdminUserModel";
import { cookies, headers } from "next/headers"
import otpgenerator from 'otp-generator';
import sendMail from "../sendmail";
import AdminUserInvitationModel from "@/models/AdminUserInvitationModel";
import MongoConn from "../mongodb";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { ErrorMessage } from "@/constants";
import AdminActivitieModel from "@/models/AdminActivitieModel";
export const currentPath = async () => {
    "use server"
    let path = headers();
    return path.get("host") ?? ""
}


export const Admin = async (): Promise<ServerMessageInterface & { admin?: AdminUserInterface }> => {
    try {
        await MongoConn();
        let token = cookies().get("admintoken");
        if (!token) throw "";
        let _ = await jwt.verify(token.value, process.env.JWTSECRET ?? "") as { _id: string }
        let admin = await AdminUserModel.findById(_._id).lean();
        if (!admin || !admin.isActive) return ErrorMessage.UNAUTHORIZED;
        admin._id = String(admin._id)
        return { success: true, msg: "User Logged In", admin }
    } catch (err) {
        return ErrorMessage.UNAUTHORIZED
    }
}


export const createAdminSendLink = async (email: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        let admins = await AdminUserModel.find({ updated: 1 });
        if (admins.length > 0) {
            return { success: false, msg: "Can't send the inviation link. Admin already exists" }
        }
        let otp = otpgenerator.generate(40, {
            upperCaseAlphabets: true,
            specialChars: false
        })
        let link = await currentPath();
        let accessToken = await jwt.sign({
            code: otp,
            email: email
        }, process.env.JWTSECRET ?? "");
        link = `${link}/admin/accept-invitation/?accessToken=${accessToken}`;
        let mail = new sendMail(email, "Accept invitation link - IST-HUB", `accept your invitation - <a href="${link}">${link}</a>`)
        await mail.send()
        let invitation = new AdminUserInvitationModel({
            code: otp,
            email,
            time: new Date(),
            invitedUserId: "owner"
        })
        await invitation.save();
        return { success: true, msg: "Invitation link has been sent" }
    } catch (err) {
        console.log("create admin send link failed ===> \n", err)
        return { success: false, msg: "Failed to send invitation link" }


    }

}

export const sendAdminInvitationLink = async (email: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) {
            return ErrorMessage.UNAUTHORIZED;
        }


        let otp = otpgenerator.generate(40, {
            upperCaseAlphabets: true,
            specialChars: false
        })
        let accessToken = await jwt.sign({
            code: otp,
            email: email
        }, process.env.JWTSECRET ?? "");
        let link = await currentPath();
        link = `${link}/admin/accept-invitation/?accessToken=${accessToken}`;
        let mail = new sendMail(email, "Accept invitation link - IST-HUB", `accept your invitation - <a href="${link}">${link}</a>`)
        let adminActivity = new AdminActivitieModel({
            title: "Admin Invitation Link sent",
            userid: admin.admin._id,
            message: `An invitation link sent to <a href="mailto:${email}">${email}</a>`,
            time : new Date()
        })
        adminActivity.save();
        await mail.send()
        let invitation = new AdminUserInvitationModel({
            code: otp,
            email,
            time: new Date(),
            invitedUserId: admin.admin._id
        })
        await invitation.save();
        return { success: true, msg: "Invitation link has been sent" }
    } catch (err) {
        console.log("create admin send link failed ===> \n", err)
        return { success: false, msg: "Failed to send invitation link" }


    }

}

export const checkInvitation = async (accessToken: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let { code, email } = await jwt.verify(accessToken, process.env.JWTSECRET ?? "") as { email: string, code: string }
        await MongoConn();
        let inv = await AdminUserInvitationModel.findOne({
            code,
            email
        })
        if (!inv || !inv.time) {
            return {
                success: false,
                msg: "Invalid Invitation"
            }
        }
        let dist = new Date().getTime() - new Date(inv.time).getTime();
        if (dist > (1000 * 60 * 10)) {
            return {
                success: false,
                msg: "Invitation link expired!"
            }
        }
        let admin = await AdminUserModel.findOne({ email });
        if (!admin) {
            admin = new AdminUserModel({
                name: "",
                password: "",
                email: inv.email,
                photo: "",
                phone: "",
                updated: false,
                invitedBy: inv.invitedUserId
            })
            await admin.save();
        }
        await inv.deleteOne();
        let token = await jwt.sign({ _id: admin._id, name: "", email: inv.email, photo: "", phone: "" }, process.env.JWTSECRET ?? "JWT");
        cookies().set("admintoken", token);
        return { success: true, msg: "Valid invitation link" }
    } catch (err) {
        console.log("failed to check invitation link ===> \n", err)
        return { success: false, msg: "Failed to check the link" }
    }
}

export const updateAdminProfile = async (details: AdminUserInterface & { oldPass?: string }): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let admin = await Admin();
        if (!admin.admin) {
            return { success: false, msg: admin.msg }
        }
        if (admin.admin.updated) {
            if (!details.oldPass) {
                return { success: false, msg: "Old password is required" }
            }
            let verify = await bcrypt.compare(details.oldPass, admin.admin.password);
            if (!verify) {
                return { success: false, msg: "Old password is not correct" }
            }
        }
        let _admin = await AdminUserModel.findById(admin.admin._id);
        if (!_admin) return ErrorMessage.UNAUTHORIZED;
        _admin.updated = true;
        _admin.name = details.name;
        _admin.password = await bcrypt.hash(details.password, 10);
        _admin.phone = details.phone;
        await _admin.save();
        return { success: true, msg: "profile updated successfully" }
    } catch (err) {
        console.log("admin profile update failed ===> \n", err)
        return { success: false, msg: "Failed to update profile" }
    }
}

export const changePassword = async (oldpassword: string, newpassword: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let admin = await Admin();
        if (!admin.admin) return ErrorMessage.UNAUTHORIZED;
        let test = true;
        if (admin.admin.updated === true) {
            test = await bcrypt.compare(oldpassword, admin.admin.password);
        }
        if (!test) {
            return { success: false, msg: "Incorrect old password" }
        }
        let hash = await bcrypt.hash(newpassword, 10);
        await AdminUserModel.updateOne({ _id: admin.admin._id }, { password: hash, updated: true })
        return { success: true, msg: "Password changed" }
    } catch (err) {
        return { success: false, msg: "Failed to change the password" }
    }
}

export const logout = async (): Promise<void> => {
    "use server"
    cookies().delete("admintoken");
}

export const Login = async (email: string, password: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server";
    try {
        let admin = await AdminUserModel.findOne({ email });
        if (!admin) {
            return { success: false, msg: "Email not found" }
        }
        if(!admin.isActive){
            return {success : false,msg : "Account is not active"}
        }
        let test = await bcrypt.compare(password, admin.password);
        if (!test) {
            return { success: false, msg: "Password is incorrect" }
        }
        let token = await jwt.sign({ _id: admin._id, name: admin.name, phone: admin.phone, photo: admin.photo, email: admin.email }, process.env.JWTSECRET ?? "JWT");
        cookies().set("admintoken", token);
        return { success: true, msg: "Successfully loggedin", token }
    } catch (err) {
        return { success: false, msg: "Failed to login" }
    }
}