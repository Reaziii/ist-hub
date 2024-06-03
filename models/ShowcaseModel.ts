import mongoose from "mongoose";


const Schema = new mongoose.Schema<ShowcaseInterface & mongoose.Document>({
    userid : String,
    name : String,
    description : String,
})

export default (mongoose.models.showcases || mongoose.model("showcases", Schema)) as mongoose.Model<ShowcaseInterface & mongoose.Document>


