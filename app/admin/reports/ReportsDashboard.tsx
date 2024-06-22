"use client"
import AdminDashboard from '@/components/AdminDashboard'
import React, { FC } from 'react'
import Reports from './Reports'
interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    getReports: () => Promise<ServerMessageInterface & { reports: ReportInterface[] }>

}
const ReportsDashboard: FC<Props> = ({ getProfileDetails, getReports }) => {
    return (
        <AdminDashboard getProfileDetails={getProfileDetails} active='Reports'>
            {() => (
                <div>
                    <Reports getReports={getReports}/>
                </div>
            )}
        </AdminDashboard>
    )
}

export default ReportsDashboard