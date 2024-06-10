import mongoose from "mongoose";


const Schema = new mongoose.Schema<JobInterface & mongoose.Document>({
    title: String,
    description: String,
    company: String,
    company_email: String,
    website: String,
    address: String,
    type: String,
    userid: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    updatedAt: Date,
    expiredAt: {
        type: Date,
        default: new Date()
    }
},
    {
        timestamps: true
    })


export default (mongoose.models.jobs || mongoose.model("jobs", Schema)) as mongoose.Model<JobInterface & mongoose.Document>