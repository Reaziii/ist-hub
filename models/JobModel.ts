import mongoose from "mongoose";


const Schema = new mongoose.Schema<JobInterface & mongoose.Document>({
    title: String,
    description: String,
    company: String,
    company_email: String,
    website: String,
    address: String,
    type: String,
    userid : String
})


export default (mongoose.models.jobs || mongoose.model("jobs", Schema)) as mongoose.Model<JobInterface & mongoose.Document>