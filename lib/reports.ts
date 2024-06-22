import { ErrorMessage, ReportStatusType } from "@/constants";
import { user } from "./user";
import ReportModel from "@/models/ReportModel";
import sendMail from "./sendmail";
import MongoConn from "./mongodb";

export const createNewReport = async (title: string, report: string): Promise<ServerMessageInterface & { report?: ReportInterface }> => {
    "use server";
    try {
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let newReport = new ReportModel({
            title,
            report,
            reportedBy: usr.usr._id,
            reportedTime: new Date(),
            email: usr.usr.email,
            status: ReportStatusType.PENDING,
            resolvedBy: "",
            startedResolving: false
        })
        await newReport.save();
        let mail = new sendMail(usr.usr.email, "Report update", "Thanks for reporting. We will verify and let you know the update");
        await mail.send();
        newReport._id = String(newReport._id)
        return { success: true, msg: "Report submitted successfully", report: newReport }

    } catch (err) {
        console.log("failed to submit report ===> \n", err);
        return { success: false, msg: "Failed to submit the report" }
    }
}

export const myReports = async (): Promise<ServerMessageInterface & { reports: ReportInterface[] }> => {
    "use server";
    try {
        await MongoConn();
        let usr = await user();
        if (!usr.usr) {
            return { ...ErrorMessage.UNAUTHORIZED, reports: [] }
        }
        let reports = await ReportModel.find({ reportedBy: usr.usr._id }).sort({ reportedTime: -1 }).lean();
        reports = reports.map(item => ({ ...item, _id: String(item._id) }))
        return { success: true, msg: "Successfully retrived reports", reports }
    }
    catch (err) {
        console.log("failed to retrive user reports ===> \n", err)
        return { success: false, msg: "Failed to retrive reports", reports: [] }
    }
}