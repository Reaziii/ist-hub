import Header from '@/components/Header'
import React, { FC } from 'react'
interface Props {
    params: {
        report_id: string
    }
}
const Report: FC<Props> = ({ params: { report_id } }) => {
    return (
        <div>
            <Header />
            <div className='pt-[60px]'></div>
            <div className="max-w-screen-xl mx-auto">
            </div>
        </div>

    )
}

export default Report