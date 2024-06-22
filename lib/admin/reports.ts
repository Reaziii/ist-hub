import ReportModel from "@/models/ReportModel";
import MongoConn from "../mongodb";
import { Admin } from "./auth";
import { ErrorMessage, ReportStatusType } from '@/constants';


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



export const getReport = async (id: string): Promise<ServerMessageInterface & { report?: ReportInterface, resolver?: boolean }> => {
    "use server";
    try {
        await MongoConn();
        let admin = await Admin();
        if (!admin.admin) {
            return { ...ErrorMessage.UNAUTHORIZED }
        }
        let report = await ReportModel.findById(id).lean();
        if (!report) {
            return { success: false, msg: "Report doesn't exist" }
        }
        report._id = String(report._id)
        return { success: true, msg: "Reportes retrived", report, resolver: report.resolvedBy === admin.admin._id }
    } catch (err) {
        return { success: false, msg: "Failed to retrive reports" }
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
        await report.save();
        return { success: true, msg: "Report updated" }
    } catch (err) {
        console.log("admin report resolve start failed ===> \n", err);
        return { success: false, msg: "Failed to update report" }
    }
}
