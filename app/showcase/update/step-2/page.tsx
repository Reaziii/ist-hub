import { getShowCaseDetails, updateDetailsOfShowcase } from '@/lib/showcases'
import Step from './Step'
import React from 'react'
import Header from '@/components/Header';
const Page: React.FC<{ searchParams: { showcase_id: string } }> = async ({ searchParams: { showcase_id } }) => {
    const showcaseId = typeof showcase_id === 'string' ? showcase_id : undefined;
    const showcase = await getShowCaseDetails(showcase_id)
    if (!showcase.showcase || !showcase.success) {
        return <div>showcase not found</div>
    }
    return (
        showcaseId === undefined ? <div>
            Showcase ID Required
        </div> :
            <>
                <Header />
                <Step description={showcase.showcase.description} showcase_id={showcaseId as string} updateDetails={updateDetailsOfShowcase} />
            </>
    )
}

export default Page