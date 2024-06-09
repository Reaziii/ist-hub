"use client";

import Footer from '@/components/Footer';
import { EmployeeType } from '@/constants';
import { truncateString } from '@/utilities/string';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

// searchJobs={searchJobs} 
interface Props {
    searchJobs: (tags: string[], type: string) => Promise<ServerMessageInterface & { jobs: JobInterfaceWithUserData[] }>
}

const JobSearchItem: React.FC<Props> = ({ searchJobs }) => {
    let params = useSearchParams();
    let _tags: string | null = params.get("tags")
    let _type: string | null = params.get("type")
    let [jobs, setJobs] = useState<JobInterfaceWithUserData[]>([])
    let [tags, setTags] = useState<string[]>([])
    useEffect(() => {
        if (_tags)
            setTags(_tags.split(','))
    }, [_tags])
    useEffect(() => {
        searchJobs(tags, _type ?? EmployeeType.FULL_TIME).then(resp => {
            setJobs([...resp.jobs])
        })
    }, [tags, _type])
    return <div className="pb-10">
        {
            jobs.map((item, key) => (
                <div key={key} className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
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

                                style={{
                                    borderColor: tags.map(item => item.toLowerCase()).includes(item.tag.toLowerCase()) ? "green" : undefined,
                                    color: tags.map(item => item.toLowerCase()).includes(item.tag.toLowerCase()) ? "green" : undefined
                                }}
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
}

export default JobSearchItem;