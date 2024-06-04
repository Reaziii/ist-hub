import { addNewShowcase } from '@/lib/showcases'
import Step from './Step'
import React from 'react'
import Header from '@/components/Header'

const Page = () => {
    return (
        <>
            <Header />
            <Step addNewShowcase={addNewShowcase} />
        </>
    )
}

export default Page