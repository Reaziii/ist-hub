import React, { FC } from 'react'
import ReportDashboard from './ReportDashboard'
import { getProfileDetails } from '@/lib/admin/admin'
import { getReport, resolvedReport, startResolving } from '@/lib/admin/reports'


const ReportPage: FC<{ params: { report_id: string } }> = ({ params: { report_id } }) => {
    return (
        <ReportDashboard resolved={resolvedReport} getProfileDetails={getProfileDetails} getReport={getReport} report_id={report_id} startResolving={startResolving}/>
    )
}

export default ReportPage