import React, { FC } from 'react'
import Step4 from './Step';
import { addNewVerifierEmail, removeVerifierEmail } from '@/lib/profile';
const Page:FC<{searchParams: { showcase_id: number } }> = ({searchParams : {showcase_id}}) => {
    const showcaseId = typeof showcase_id === 'string' ? parseInt(showcase_id) : undefined;
    return <Step4 showcase_id={showcase_id} addNewEmailAsVerifier={addNewVerifierEmail} deleteVerifier={removeVerifierEmail}/>
}

export default Page;