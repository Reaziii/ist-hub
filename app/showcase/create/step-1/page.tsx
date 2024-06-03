import { addNewShowcase } from '@/lib/showcases'
import Step from './Step'
import React from 'react'

const Page = () => {
    return (
        <Step addNewShowcase={addNewShowcase} />
    )
}

export default Page