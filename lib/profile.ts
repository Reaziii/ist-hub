
import { cloudinaryImageUploadMethod } from "./upload";
import { user } from "./user";
import { signNewToken } from "./auth";
import { ErrorMessage } from "@/constants";
import UserModel from "@/models/UserModel";
import MongoConn from "./mongodb";
import { PipelineStage } from "mongoose";
import SkillModel from "@/models/SkillModel";

export const uploadProfilePicture = async (form: FormData): Promise<ServerMessageInterface & { img?: string }> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        const file = form.get("file") as File;
        if (!file) {
            return { success: false, msg: "File is required" }
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        try {
            let data = await cloudinaryImageUploadMethod(buffer)
            if (data.success && data.url) {
                let _user = await UserModel.findById(usr.usr._id);
                if (!_user) return ErrorMessage.UNAUTHORIZED;
                _user.photo = data.url;
                await _user.save();
                return ({ msg: "profile picture changed!", success: true, img: data.url });
            }
            throw ""
        } catch (error) {
            console.log(error)
            return ({ msg: "failed to upload profile picture", success: false });
        }
    } catch (err) {
        console.log(err)
        return ({ msg: "failed to upload profile picture", success: false });
    }
}

export const getProfileDetails = async (userid: string): Promise<ServerMessageInterface & { profile?: ProfileInterface }> => {
    try {
        await MongoConn();

        let usr = await user();
        let _user = await UserModel.findOne({
            _id: userid
        }).lean();
        if (!_user) {
            return { success: false, msg: "User doesn't exists" }
        }
        let profile: ProfileInterface = {
            phone: _user.phone,
            bio: _user.bio,
            about: _user.about,
            photo: _user.photo,
            email: _user.email,
            fullname: _user.fullname,
            resume: _user.resume,
            _id: String(_user._id),
            owner: usr.usr?._id === _user._id,
            username: _user.username,
            verified: _user.verified
        };
        return { success: true, msg: "Profile fetched successfully", profile }

    } catch (err) {


    }

    return { success: false, msg: "server error" }
}

export const updateNameAndBio = async (name: string, bio: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server"
    try {
        await MongoConn();

        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) { return { success: false, msg: "User doesn't exists" } }
        _user.fullname = name;
        _user.bio = bio;
        await _user.save();
        let token = (await signNewToken(usr.usr.email)).token
        return { success: true, msg: "Profile Updated successfully", token }
    } catch (err) {
        console.log("bio update failed ===> ", err);
        return { success: false, msg: "Failed to update" }
    }
}

export const updateAbout = async (about: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server"
    try {
        await MongoConn();

        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) return { success: false, msg: "User doesn't exists" }
        _user.about = about;
        await _user.save();
        let token = (await signNewToken(usr.usr.email)).token
        return { success: true, msg: "About Updated successfully", token }
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update" }
    }
}


export const uploadResume = async (form: FormData): Promise<ServerMessageInterface> => {
    "use server"
    let file = form.get("file") as File;
    try {
        await MongoConn();
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        const buffer = Buffer.from(await file.arrayBuffer());
        let _ = await cloudinaryImageUploadMethod(buffer)
        if (!_.success) throw "";
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) {
            return { success: false, msg: "You are not authorized" }
        }
        _user.resume = _.url ?? "";
        await _user.save();
        return { success: true, msg: "Resume uploaded successfully" }


    } catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to upload resume" }
}


export const searchProfile = async (skills: string[]): Promise<ServerMessageInterface & { users: ShortUserInterface[] }> => {
    "use server"
    try {
        skills = skills.map(item => item.toLowerCase())
        console.log(skills)
        await MongoConn();

        let user:ShortUserInterface[] = []

        let users = await UserModel.find()


        for(let i = 0;i<users.length;i++){
            let av = false;

            let _skills = await SkillModel.find({userid : users[i]._id}).lean()

            for(let i = 0;i<_skills.length;i++){
                if(skills.indexOf(_skills[i].skill.toLowerCase())!=-1){
                  av = true
                }
            
            
            }
            if(av == true){
                user.push({
                    fullname : users[i].fullname,
                    email: users[i].email,
                    photo : users[i].photo,
                    username: users[i].username,
                    skills: _skills.map(item=> ({...item, _id : String(item._id)})),
                    _id : String(users[i]._id),
                    bio: users[i].bio,
                    resume: users[i].resume
                    
                })
            }


        }

        return { success: true, msg: "Retrived users", users: user }
    } catch (err) {
        return { success: false, msg: "Failed to retrived", users: [] }
    }
}

