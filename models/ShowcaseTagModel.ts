import mongoose from "mongoose";


const schema = new mongoose.Schema<ShowcaseTagInterface & mongoose.Document>({
    showcase_id: String,
    tag: String
})

export default (mongoose.models.showcasetags || mongoose.model("showcasetags", schema)) as mongoose.Model<ShowcaseTagInterface & mongoose.Document>