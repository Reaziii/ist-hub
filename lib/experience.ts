import { ErrorMessage } from "@/constants";
import MongoConn from "./mongodb";
import { user } from "./user";
import ExperienceModel from "@/models/ExperienceModel";
export const addNewExperience = async (params: ExperieneInterfaces): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let newExperience = new ExperienceModel({
            title: params.title,
            employee_type: params.employee_type,
            position: params.position,
            company_name: params.company_name,
            start_date: params.start_date,
            end_date: params.end_date,
            location: params.location,
            still: params.still,
            userid: usr.usr._id
        });
        await newExperience.save();
        return { success: true, msg: "New experience added successfully" }
    } catch (err) {
        console.log("mew experience add ===>", err);
    }
    return { success: false, msg: "Failed to add new experience" }
}


export const getExperiences = async (userid: string): Promise<ServerMessageInterface & { experiences?: ExperieneInterfaces[] }> => {
    "use server"
    try {
        await MongoConn();
        let experiences = await ExperienceModel.find({ userid }).lean()
        experiences = experiences.map((item) => ({ ...item, _id: String(item._id) }))
        return { success: true, msg: "Experiences fetched successfully", experiences }
    }
    catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Couldn't retrived educations" }
}



export const updateAnExperience = async (params: ExperieneInterfaces): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let experience = await ExperienceModel.findOne({
            _id: params._id,
            userid: usr.usr._id
        })
        if (!experience) {
            return { success: false, msg: "Experience not found!" }
        }
        experience.title = params.title;
        experience.employee_type = params.employee_type;
        experience.position = params.position;
        experience.company_name = params.company_name;
        experience.start_date = params.start_date;
        experience.end_date = params.end_date;
        experience.still = params.still;
        await experience.save();
        return { success: true, msg: "Experience updated successfully" }
    }
    catch (err) {
        console.log(err)
    }
    return { success: false, msg: "Failed to update!" }

}


export const deleteAnExperienceItem = async (id: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let experience = await ExperienceModel.findOne({
            _id: id,
            userid: usr.usr._id
        })
        if (!experience) {
            return { success: false, msg: "Experience not found!" }
        }
        await experience.deleteOne();
        return { success: true, msg: "Successfully Deleted" }
    } catch (err) {
        console.log("delete experience ===> ", err)
        return { success: false, msg: "Failed to delete" }
    }
}
