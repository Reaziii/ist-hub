import ShowcaseModel from "@/models/ShowcaseModel";
import MongoConn from "./mongodb";
import { user } from "./user";
import { ErrorMessage } from "@/constants";
import ShowcaseTagModel from "@/models/ShowcaseTagModel";
export const getProfileShowcases = async (userid: string): Promise<ServerMessageInterface & { showcases: ShowcaseInterface[] }> => {
    "use server";
    try {
        await MongoConn()
        let showcases = await ShowcaseModel.find({ userid }).lean();
        showcases = showcases.map((item) => ({ ...item, _id: String(item._id) }))
        for (let i = 0; i < showcases.length; i++) {
            showcases[i].tags = await ShowcaseTagModel.find({ showcase_id: showcases[i]._id }).lean()
            showcases[i].tags = showcases[i].tags.map((item) => ({ ...item, _id: String(item._id) }))
        }
        return { success: true, msg: "Showcases fetched succesfully", showcases }
    }
    catch (err) {
        return { success: false, msg: "Something went wrong", showcases: [] }
    }
}



export const addNewShowcase = async (name: string): Promise<ServerMessageInterface & { showcase_id?: string }> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let newShowcase = new ShowcaseModel({
            userid: usr.usr._id,
            name: name,
            description: ""
        })
        await newShowcase.save();
        return { success: true, msg: "Succesfully created new Shwocase", showcase_id: String(newShowcase._id) }
    } catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to create" }

}

export const updateDetailsOfShowcase = async (details: string, _id: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) { return ErrorMessage.UNAUTHORIZED }
        let showcase = await ShowcaseModel.findOne({
            _id,
            userid: usr.usr._id
        })
        if (!showcase) {
            return { success: false, msg: "Showcase not found" }
        }
        showcase.description = details;
        await showcase.save();
        return { success: true, msg: "Details updated succesfully" };
    }
    catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update details" }
    }
}


export const updateTagsOfShowcase = async (tags: string[], _id: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let showcase = await ShowcaseModel.findOne({
            userid: usr.usr._id,
            _id
        }).lean().select("_id")
        if (!showcase) {
            return ErrorMessage.UNAUTHORIZED;
        }
        await ShowcaseTagModel.deleteMany({ showcase_id: _id });
        for (let i = 0; i < tags.length; i++) {
            let item = tags[i];
            let tag = new ShowcaseTagModel({
                showcase_id: _id,
                tag: item
            })
            await tag.save();
        }
        return { success: true, msg: "Tags updated succesfully" }

    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update tags" }

    }
}

export const getShowCaseDetails = async (_id: string): Promise<ServerMessageInterface & { showcase: ShowcaseInterface }> => {
    "use server"
    try {
        await MongoConn();
        let showcase = await ShowcaseModel.findById(_id).lean()
        if (!showcase) {
            return { success: false, msg: "Showcase doesn't exists", showcase: { name: "", description: "", _id: "", tags: [], userid: "" } }
        }
        showcase._id = String(showcase._id)
        showcase.tags = await ShowcaseTagModel.find({ showcase_id: showcase._id }).lean()
        showcase.tags = showcase.tags.map((item) => ({ ...item, _id: String(item._id) }))
        return { success: true, msg: "Showcase name fetched successfully", showcase: showcase }
    } catch (err) {
        console.log("showcase name fetch ===> \n", err)
        return { success: false, msg: "Something went wrong", showcase: { name: "", description: "", _id: "", tags: [], userid: "" } }
    }
}

export const updateShowcaseName = async (_id: string, name: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if(!usr.usr){
            return ErrorMessage.UNAUTHORIZED
        }
        await MongoConn();
        let showcase = await ShowcaseModel.findById(_id);
        if (!showcase) {
            return { success: false, msg: "Showcase doesn't exists" }
        }
        if(showcase.userid!==usr.usr._id){
            return ErrorMessage.UNAUTHORIZED;
        }
        showcase.name = name;
        await showcase.save();
        return { success: true, msg: "Showcase updated successfully" }
    } catch (err) {
        console.log("showcase name update ===> \n", err);
        return { success: false, msg: "Showcase name update failed" }
    }
}
