import mongoose from "mongoose";

const schema = new mongoose.Schema<ActivitiesInterface & mongoose.Document>({
    userid : String,
    message : String,
    title : String
})

export default (mongoose.models.adminactivities || mongoose.model("adminactivities", schema)) as mongoose.Model<ActivitiesInterface & mongoose.Document>