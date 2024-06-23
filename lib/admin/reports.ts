import ReportModel from "@/models/ReportModel";
import MongoConn from "../mongodb";
import { Admin } from "./auth";
import { ErrorMessage, ReportStatusType } from '@/constants';
import UserModel from "@/models/UserModel";
import AdminActivitieModel from "@/models/AdminActivitieModel";
import { truncateString } from "@/utilities/string";
import AdminUserModel from "@/models/AdminUserModel";


export const getReports = async (): Promise<ServerMessageInterface & { reports: ReportInterface[] }> => {
    "use server";
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) {
            return { ...ErrorMessage.UNAUTHORIZED, reports: [] }
        }
        let reports = await ReportModel.find().sort({ reportedTime: -1 }).lean();
        reports = reports.map(item => ({ ...item, _id: String(item._id) }))
        return { success: true, msg: "Reportes retrived", reports }
    } catch (err) {
        return { success: false, msg: "Failed to retrive reports", reports: [] }
    }
}



export const getReport = async (id: string): Promise<ServerMessageInterface & { report?: ReportInterface, resolver?: boolean, username: string, fullname: string, resolverAccount?: AdminUserInterface }> => {
    "use server";
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) {
            return { ...ErrorMessage.UNAUTHORIZED, username: "", fullname: "" }
        }
        let report = await ReportModel.findById(id).lean();
        if (!report) {
            return { success: false, msg: "Report doesn't exist", username: "", fullname: "" }
        }
        report._id = String(report._id)
        let user = await UserModel.findById(report.reportedBy);
        if (!user) return { success: false, msg: "Reporter not found", username: "", fullname: "" }
        const { username, fullname } = user;
        let resolvedAccount: AdminUserInterface | undefined = undefined;

        if (report.startedResolving) {
            let _ = await AdminUserModel.findById(report.resolvedBy).lean();
            if (_) {
                resolvedAccount = _;
                resolvedAccount._id = String(_.id)
            }
        }
        report._id = String(report._id)

        return { success: true, msg: "Reportes retrived", report, resolver: report.resolvedBy === admin.admin._id, username, fullname, resolverAccount: resolvedAccount }
    } catch (err) {
        console.log("Failed to retrive admin report ===> \n", err)
        return { success: false, msg: "Failed to retrive reports", username: "", fullname: "" }
    }
}


export const startResolving = async (id: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) return ErrorMessage.UNAUTHORIZED;
        let report = await ReportModel.findById(id);
        if (!report) {
            return { success: false, msg: "Report doesn't exist" }
        }
        if (report.startedResolving) {
            return { success: false, msg: "Already started" }
        }
        report.startedResolving = true;
        report.resolvedBy = admin.admin._id;
        let activity = new AdminActivitieModel({
            title: "Report resolving started",
            message: `Started resolving report - <a href="/admin/reports/${report._id}">${truncateString(report.report, 10)}</a>`,
            userid: admin.admin._id,
            time: new Date()
        })
        await activity.save();
        await report.save();
        return { success: true, msg: "Resolving started" }
    } catch (err) {
        console.log("admin report resolve start failed ===> \n", err);
        return { success: false, msg: "Failed to start resolving" }
    }
}

export const resolvedReport = async (id: string): Promise<ServerMessageInterface> => {
    "use server";
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) return ErrorMessage.UNAUTHORIZED;
        let report = await ReportModel.findById(id);
        if (!report) {
            return { success: false, msg: "Report doesn't exist" }
        }
        if (report.resolvedBy !== admin.admin._id) return { success: false, msg: "You are not allowed to resolve" }
        report.status = ReportStatusType.RESOLVED
        let activity = new AdminActivitieModel({
            title: "Report resolved",
            message: `Resolved report - <a href="/admin/reports/${report._id}">${truncateString(report.report, 10)}</a>`,
            userid: admin.admin._id,
            time: new Date()
        })
        await activity.save();
        await report.save();
        return { success: true, msg: "Report updated" }
    } catch (err) {
        console.log("admin report resolve start failed ===> \n", err);
        return { success: false, msg: "Failed to update report" }
    }
}
