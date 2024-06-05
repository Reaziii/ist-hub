"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import { truncateString } from '@/utilities/string'
import React, { useEffect, useState } from 'react'
interface Props {
    getJobs: (userid: string) => Promise<ServerMessageInterface & { jobs: JobInterface[] }>,
    userid: string
}
const Jobs: React.FC<Props> = ({ getJobs, userid }) => {
    const [loading,setLoading] = useState(false);
    const [myjobs, setMyJobs] = useState<JobInterface[]>([])
    useEffect(() => {
        setLoading(true);
        getJobs(userid).then(resp => {
            setMyJobs([...resp.jobs])
            setLoading(false);
        })
    }, [])
    return <div>
       
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 pl-0">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                MY JOBS
            </h3>
        </div>
        {
            loading ? <div className='h-[80vh] w-full flex items-center justify-center'>
                <ButtonSpinner />
            </div> : null
        }
        {
            myjobs.map((item, key) => (
                <div key={key} className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
                    <h1 className='font-bold'>
                        {item.title} | {item.type}
                    </h1>
                    <p>
                        {truncateString(item.description, 200)}
                    </p>
                    <a target="_blank" className="text-blue-600" href={item.website}>
                        {item.company}
                    </a>
                </div>
            ))
        }
    </div>
}

export default Jobs;