"use client"
import AdminProfileCard from './AdminProfileCard'
import BorderWrapper from '@/components/BorderWrapper'
import ButtonSpinner from '@/components/ButtonSpinner'
import handleToast from '@/components/handleToast'
import { ReportStatusType } from '@/constants'
import { formatDateTime } from '@/utilities/date'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
interface Props {
    getReport: (id: string) => Promise<ServerMessageInterface & { report?: ReportInterface, resolver?: boolean, username: string, fullname: string, resolverAccount?: AdminUserInterface }>,
    report_id: string,
    startResolving: (id: string) => Promise<ServerMessageInterface>,
    resolved: (id: string) => Promise<ServerMessageInterface>

}
const Report: FC<Props> = (props) => {
    const [report, setReport] = useState<ReportInterface & { username: string, fullname: string } | null>(null)
    const history = useRouter();
    const [buttonLoading, setButtonLoading] = useState(false)
    const [resolver, setResolver] = useState(false);
    const [resolverAccount, setResolverAccount] = useState<AdminUserInterface | null>(null)
    useEffect(() => {
        props.getReport(props.report_id).then(resp => {
            if (resp.success && resp.report) {
                setReport({ ...resp.report, username: resp.username, fullname: resp.fullname })
                if (resp.resolver === true) {
                    setResolver(true);
                    if (resp.resolverAccount) {
                        setResolverAccount(resp.resolverAccount)
                    }
                }
            }
            else {
                handleToast(resp);
                history.push("/admin/reports")
            }
        })
    }, [resolver])
    if (!report) {
        return (
            <div className='h-[100vh] w-full flex justify-center items-center'>
                <ButtonSpinner />
            </div>
        )
    }
    let color = "green"
    if (report.status === ReportStatusType.PENDING && report.startedResolving) {
        color = "purple"
    }
    else if (report.status === ReportStatusType.PENDING) {
        color = "orange"
    }
    else if (report.status === ReportStatusType.RESOLVED) {
        color = "green"
    }
    else if (report.status === ReportStatusType.CANCELED) {
        color = "red"
    }



    return (
        <>
            <BorderWrapper>
                <div className='w-full relative'>
                    <div className='absolute right-0 top-0'>
                        {
                            report.startedResolving ? <div>

                            </div> :
                                <button onClick={() => {
                                    if (buttonLoading) return
                                    setButtonLoading(true);
                                    props.startResolving(props.report_id).then(resp => {
                                        handleToast(resp);
                                        if (resp.success) {
                                            setReport({ ...report, startedResolving: true })
                                            setResolver(true)
                                        }
                                        setButtonLoading(false)
                                    })
                                }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    {buttonLoading ? <ButtonSpinner /> : "Start Resolving"}
                                </button>
                        }
                        {
                            resolver && report.status === ReportStatusType.PENDING && <>
                                <button onClick={() => {
                                    props.resolved(props.report_id).then(resp => {
                                        handleToast(resp)
                                        if (resp.success)
                                            setReport({ ...report, status: ReportStatusType.RESOLVED })

                                    })
                                }} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Resolved</button>
                            </>
                        }
                    </div>

                    <div className="flex items-center">{formatDateTime(report.reportedTime)}
                        <div
                            style={{ background: color }}
                            className='h-[10px] w-[10px] ml-2 rounded-full'>
                        </div>

                    </div>
                    <a target='_blank' href={`/profile/${report.username}`}>{report.fullname}</a>
                    <h1 className="font-bold">{report.title}</h1>
                    <p>{report.report}</p>
                </div>
            </BorderWrapper>
            {
                resolverAccount && report.status === ReportStatusType.RESOLVED && <AdminProfileCard admin={resolverAccount} title='Resolved by'/>
            }
            {
                resolverAccount && report.status === ReportStatusType.PENDING && <AdminProfileCard admin={resolverAccount} title='Resolving by'/>
            }
        </>
    )
}

export default Report