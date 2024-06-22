import BorderWrapper from '@/components/BorderWrapper'
import HorizontalBar from '@/components/HorizontalBar'
import handleToast from '@/components/handleToast'
import { ReportStatusType } from '@/constants'
import { formatDateTime } from '@/utilities/date'
import { truncateString } from '@/utilities/string'
import React, { FC, useEffect, useState } from 'react'
interface Props {
    getReports: () => Promise<ServerMessageInterface & { reports: ReportInterface[] }>
}

const Reports: FC<Props> = (props) => {
    const [reports, setReports] = useState<ReportInterface[]>([])
    useEffect(() => {
        props.getReports().then(resp => {
            if (!resp.success) {
                handleToast(resp)
            }
            setReports([...resp.reports])
        })
    }, [])
    return (
        <BorderWrapper>
            <div>
                <h1 className="font-bold text-[20px] mb-6">Reports</h1>

                {
                    reports.map((item, key) => {
                        let color = "green"
                        if (item.status === ReportStatusType.PENDING && item.startedResolving) {
                            color = "purple"
                        }
                        else if (item.status === ReportStatusType.PENDING) {
                            color = "orange"
                        }
                        else if (item.status === ReportStatusType.RESOLVED) {
                            color = "green"
                        }
                        else if (item.status === ReportStatusType.CANCELED) {
                            color = "red"
                        }
                        return (
                            <div key={key}>
                                <div className="flex items-center">{formatDateTime(item.reportedTime)}

                                    <div
                                        style={{ background: color }}
                                        className='h-[10px] w-[10px] ml-2 rounded-full'>
                                    </div>
                                </div>
                                <a href={`/admin/reports/${item._id}`} className='font-bold'>{item.title}</a>
                                <p>
                                    {truncateString(item.report, 100)}
                                </p>
                                <HorizontalBar />
                            </div>
                        )
                    })
                }
            </div>
        </BorderWrapper>
    )
}

export default Reports