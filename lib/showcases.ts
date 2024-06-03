import ShowcaseModel from "@/models/ShowcaseModel";
export const getProfileShowcases = async (userid: number): Promise<ServerMessageInterface & { showcases: ShowcaseInterface[] }> => {
    "use server";
    try {
        let showcases = await ShowcaseModel.find({ userid })
        return { success: true, msg: "Showcases fetched succesfully", showcases }
    }
    catch (err) {
        return { success: false, msg: "Something went wrong", showcases: [] }
    }
}