"use client"
import React, { FC, useEffect, useState } from 'react'
import CreateReport from './CreateReport'
import BorderWrapper from '@/components/BorderWrapper'
import HorizontalBar from '@/components/HorizontalBar'
import { truncateString } from '@/utilities/string'
import { formatDateTime } from '@/utilities/date'
import FullPageLoader from '@/components/FullPageLoader'
import ButtonSpinner from '@/components/ButtonSpinner'
import { ReportStatusType } from '@/constants'
interface Props {
    create: (title: string, report: string) => Promise<ServerMessageInterface & { report?: ReportInterface }>,
    getReports: () => Promise<ServerMessageInterface & { reports: ReportInterface[] }>
}
const Reports: FC<Props> = ({ create, getReports }) => {
    const [reports, setReports] = useState<ReportInterface[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getReports().then(resp => {
            setReports([...resp.reports])
            setLoading(false);
        })
    }, [])
    return (
        <div>
            <CreateReport add={(report) => {
                setReports([report, ...reports])

            }} create={create} />
            <BorderWrapper>
                {
                    loading ? <div className='min-h-[200px] w-full flex justify-center items-center'>
                        <ButtonSpinner />
                    </div> :
                        <div>
                            <h1 className="font-bold text-[20px] mb-6">My Reports</h1>
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
                                            <a href={`/report/${item._id}`} className='font-bold'>{item.title}</a>
                                            <p>
                                                {truncateString(item.report, 100)}
                                            </p>
                                            <HorizontalBar />
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </BorderWrapper>
        </div>
    )
}

export default Reports