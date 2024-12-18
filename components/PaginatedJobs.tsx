"use client"
import { truncateString } from '@/utilities/string';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import WhitelistJobButton from './WhitelistJobButton';
import PageLoder from './PageLoder';
import ButtonSpinner from './ButtonSpinner';

interface Props {
    getPaginatedJobs: (page: number, limit: number) => Promise<ServerMessageInterface & { jobs: JobInterfaceWithUserData[] }>,
    toggleWhiteList: (job_id: string) => Promise<ServerMessageInterface>
}
const PaginatedJobs: React.FC<Props> = ({ getPaginatedJobs, toggleWhiteList }) => {
    const [page, setPage] = useState(1);
    const [jobs, setJobs] = useState<JobInterfaceWithUserData[]>([]);
    const [hasMore, setHasmore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showMoreLoding, setShowmoreLoading] = useState(false);
    const showMore = () => {
        if (!hasMore) return;
        setShowmoreLoading(true);
        getPaginatedJobs(page + 1, 10).then((resp) => {
            setJobs([...jobs, ...resp.jobs])
            setPage(page + 1)
            if (resp.jobs.length === 0) setHasmore(false);
            setShowmoreLoading(false);
        })
    }
    useEffect(() => {
        setLoading(true);
        getPaginatedJobs(page, 10).then(resp => {
            setJobs([...resp.jobs])
            if (resp.jobs.length === 0) setHasmore(false);
            setLoading(false);
        })
    }, [])
    if (loading) {
        return <PageLoder />
    }
    return (
        <div className='flex flex-col items-center w-full'>
            <div>
                {
                    jobs.map((item, key) => (
                        <div key={key} className='border mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
                            <WhitelistJobButton whitelisted={item.whitelisted} toggleWhitelist={toggleWhiteList} job_id={item._id} />
                            <a href={`/profile/${item.username}`} target='_blank'>{item.fullname}</a>
                            <div className='pt-2' />
                            <a href={"/job/" + item._id}>
                                <h1 className='font-bold'>
                                    {item.title} | {item.type}
                                </h1>
                            </a>
                            <p>
                                {truncateString(item.description, 200)}
                            </p>
                            <div className='flex flex-wrap gap-2 my-2'>
                                {
                                    item.tags.map((item, key) => (<p key={key}
                                        className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                                    >{item.tag}
                                    </p>))
                                }
                            </div>
                            <a target="_blank" className="text-blue-600" href={item.website}>
                                {item.company}
                            </a>

                        </div>
                    ))
                }
            </div>

            <button onClick={showMore} type="button" className="h-[50px] me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full rounded-[5px] mt-2 flex justify-center items-center">
                {
                    showMoreLoding ? <ButtonSpinner /> :
                        hasMore ? "Show More" : "No More Jobs"
                }
            </button>

        </div>
    )
}

export default PaginatedJobs