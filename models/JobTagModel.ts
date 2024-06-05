import mongoose from "mongoose";

const Schema = new mongoose.Schema<JobTagInterface & mongoose.Document>({
    tag: String,
    job_id: String,
})

export default (mongoose.models.jobtags || mongoose.model("jobtags", Schema)) as mongoose.Model<JobTagInterface & mongoose.Document>