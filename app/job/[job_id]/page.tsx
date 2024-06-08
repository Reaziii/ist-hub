import Header from '@/components/Header'
import React from 'react'
import Job from './Job'
import { getJobDetails } from '@/lib/jobs'
import { user } from '@/lib/user'
interface Props {
    params: {
        job_id: string
    }
}
const JobDetails: React.FC<Props> = async ({ params: { job_id } }) => {
    const usr = await user();
    return (
        <div>
            <Header />
            <div className='pt-[60px]' />
            <div className="max-w-screen-xl mx-auto">
                <Job getJobDetails={getJobDetails} job_id={job_id} userid={usr.usr?._id} />
            </div>

        </div>
    )
}

export default JobDetails