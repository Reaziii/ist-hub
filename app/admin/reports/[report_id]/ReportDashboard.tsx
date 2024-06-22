"use client"
import AdminDashboard from '@/components/AdminDashboard'
import React, { FC } from 'react'
import Report from './Report'
interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    getReport: (id: string) => Promise<ServerMessageInterface & { report?: ReportInterface, resolver?: boolean }>,
    report_id: string,
    startResolving: (id: string) => Promise<ServerMessageInterface>,
    resolved: (id: string) => Promise<ServerMessageInterface>


}
const ReportDashboard: FC<Props> = (props) => {
    return (
        <AdminDashboard active='Reports' getProfileDetails={props.getProfileDetails}>
            {
                () => {
                    return <Report resolved={props.resolved} startResolving={props.startResolving} getReport={props.getReport} report_id={props.report_id} />
                }
            }
        </AdminDashboard>
    )
}

export default ReportDashboard