"use client"
import ButtonSpinner from '@/components/ButtonSpinner';
import ShowTextAreaText from '@/components/ShowTextAreaText';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface Props {
    getJobDetails: (job_id: string) => Promise<ServerMessageInterface & { job?: JobInterface }>,
    job_id: string,
    userid: string | undefined | null
}
const Job: React.FC<Props> = ({ getJobDetails, job_id, userid }) => {
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState<JobInterface | null>(null);
    useEffect(() => {
        getJobDetails(job_id).then(resp => {
            if (resp.job) {
                setJob(resp.job)
            }
            setLoading(false);

        })
    }, [])

    if (loading) {
        return <div className='h-[100vh] w-full flex justify-center items-center'>
            <ButtonSpinner />
        </div>
    }

    if (!job) {
        return <div className='h-[100vh] w-full flex justify-center items-center'>
            <h1>Job not found</h1>
        </div>
    }
    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative mb-[100px] flex-column'>
            <p>{job.company}</p>
            <h1 className='font-bold'>{job.title} | {job.type}</h1>
            <p>{job.address}</p>
            <a target='_blank' className="text-blue-400" href={job.website}>{job.website}</a>
            <br />
            <a target='_blank' className="text-blue-400" href={`mailto:${job.company_email}`}>{job.company_email}</a>
            <div className='mt-[40px]' />
            <ShowTextAreaText text={job.description} />
            <div className='flex flex-wrap mt-10 gap-2'>
                {
                    job.tags.map((item, key) => (<p key={key}
                        className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                    >{item.tag}
                    </p>))
                }
            </div>
            {
                userid === job.userid && <a href={`/job/update/${job_id}`}>
                    <button className='absolute right-5 top-5 hover:bg-gray-100 h-10 w-10 border rounded-full transition-all'>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                </a>
            }
        </div >
    )
}

export default Job