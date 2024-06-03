import { updateTagsOfShowcase } from '@/lib/profile'
import Step from './Step'
import React from 'react'
const Page: React.FC<{ searchParams: { showcase_id: number } }> = ({ searchParams: { showcase_id } }) => {
    const showcaseId = typeof showcase_id === 'string' ? showcase_id : undefined;

    return (
        showcaseId === undefined ? <div>
            Showcase ID Required
        </div> :
            <Step showcase_id={showcaseId as string} updateTags={updateTagsOfShowcase} />
    )
}

export default Page