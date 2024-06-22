import { ReportStatusType } from "@/constants";
import mongoose from "mongoose";

const schema = new mongoose.Schema<ReportInterface & mongoose.Document>({
    report: String,
    email: String,
    reportedBy: String,
    reportedTime: Date,
    title: String,
    status: {
        type: Number,
        default: ReportStatusType.PENDING
    },
    startedResolving: {
        type: Boolean,
        default: false
    },
    resolvedBy : String
})


export default (mongoose.models.reports || mongoose.model("reports", schema)) as mongoose.Model<ReportInterface & mongoose.Document>