import { addNewShowcase, getShowCaseDetails, updateShowcaseName } from '@/lib/showcases'
import { FC } from 'react'
import Step from './Step'
import React from 'react'
import Header from '@/components/Header'

const Page: FC<{ searchParams: { showcase_id: string } }> = async ({ searchParams: { showcase_id } }) => {
    let showcase = await getShowCaseDetails(showcase_id)
    if (!showcase.success && !showcase.showcase) {
        return <div>Showcase not found</div>
    }
    return (
        <>

            <Header />
            <Step name={showcase.showcase.name} updateShowcaseName={updateShowcaseName} showcase_id={showcase_id} />

        </>
    )
}

export default Page

//{ searchParams: { showcase_id: number } }> = ({ searchParams: { showcase_id } }