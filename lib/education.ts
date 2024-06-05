import { ErrorMessage } from "@/constants";
import MongoConn from "./mongodb";
import EducationModel from "@/models/EducationModel";
import { user } from "./user";
export const addNewEducation = async (params: EducationInterface): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();

        let usr = await user();
        if (!usr || !usr.login || !usr.usr) return ErrorMessage.UNAUTHORIZED;
        let education = new EducationModel({
            school : params.school,
            degree : params.degree,
            grade : params.grade,
            start_date : params.start_date,
            end_date : params.end_date,
            still : params.still,
            userid: String(usr.usr._id)
        });
        await education.save();
        return {
            success: true,
            msg: "New education added successfully"
        }
    }
    catch (err) {
        console.log("[add new education]", err)
    }


    return { success: false, msg: "Failed to add Education" }
}


export const getEducations = async (userid: string): Promise<ServerMessageInterface & { educations?: EducationInterface[] }> => {
    "use server"
    try {
        await MongoConn();

        let educations = await EducationModel.find({ userid }).lean();
        educations = educations.map((item) => ({ ...item, _id: String(item._id) }))
        return { success: true, msg: "Education retrived", educations }
    }
    catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Couldn't retrived educations" }


}

export const updateAnEducation = async (params: EducationInterface): Promise<ServerMessageInterface> => {
    "use server"
    try {
        console.log(params);
        await MongoConn();
        const usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let education = await EducationModel.findById(params._id);
        if (!education) {
            return { success: false, msg: "Education doesn't exists" }
        }
        education.school = params.school;
        education.degree = params.degree;
        education.grade = params.grade;
        education.still = params.still;
        education.start_date = params.start_date;
        education.end_date = params.end_date;
        await education.save();
        return {
            success: true, msg: "Education updated successfully"
        }
    }
    catch (err) {
        console.log(err)
    }
    return { success: false, msg: "Failed to update!" }

}

export const deleteAnEduItem = async (id: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        await MongoConn();
        let education = await EducationModel.findById(id);
        await education?.deleteOne();
        return { success: true, msg: "Successfully Deleted" }
    } catch (err) {
        return { success: false, msg: "Failed to delete" }
    }
}
