import SkillModel from "@/models/SkillModel";
import { user } from "./user";
import { ErrorMessage } from "@/constants";

export const addNewSkill = async (skill: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let newSkill = new SkillModel({
            userid: usr.usr._id,
            skill: skill
        });
        await newSkill.save();
        return { success: true, msg: "Skill added successfully" }
    }
    catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to upload" }
}
export const getSkills = async (userid: string): Promise<ServerMessageInterface & { skills: SkillInterface[] }> => {
    "use server"
    try {
        let skills = await SkillModel.find({ userid }).lean()
        skills = skills.map((item) => ({
            ...item,
            _id: String(item._id)
        }))
        return { success: true, msg: "Skills retrived", skills }

    } catch (err) {

    }
    return { success: false, msg: "Failed to retrive skills", skills: [] }
}
export const deleteASkill = async (_id: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let skill = await SkillModel.findOne({
            userid: usr.usr._id,
            _id
        })
        if (!skill) {
            return { success: false, msg: "Skill not found!" }
        }
        await skill.deleteOne();
        return { success: true, msg: "Skill deleted successfully" }

    } catch (err) {
        console.log(err);

    }
    return { success: false, msg: "Failed to delete" }
}