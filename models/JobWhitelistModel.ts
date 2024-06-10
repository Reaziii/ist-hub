import mongoose from "mongoose";

const schema = new mongoose.Schema<JobWhiteListInterface & mongoose.Document>({
    userid: String,
    job_id: String
});

export default (mongoose.models.jobwhitelists || mongoose.model("jobwhitelists", schema)) as mongoose.Model<JobWhiteListInterface & mongoose.Document>