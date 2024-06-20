import mongoose from "mongoose";

const schema = new mongoose.Schema<ActivitiesInterface & mongoose.Document>({
    userid: String,
    message: String,
    title: String,
    time: {
        type: Date,
        default: new Date()
    }
})


export default (mongoose.models.adminactivities || mongoose.model("adminactivities", schema)) as mongoose.Model<ActivitiesInterface & mongoose.Document>