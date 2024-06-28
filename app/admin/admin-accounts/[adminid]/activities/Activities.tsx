"use client"
import HorizontalBar from '@/components/HorizontalBar'
import { formatDateTime } from '@/utilities/date'
import React, { FC, useEffect, useState } from 'react'
interface Props {
    getActivities: (adminid?: string) => Promise<ServerMessageInterface & { activities: ActivitiesInterface[] }>,
    adminid:string

}
const Activities: FC<Props> = ({ getActivities , adminid}) => {
    const [activities, setActivities] = useState<ActivitiesInterface[]>([])
    useEffect(() => {
        getActivities(adminid).then(resp => {
            setActivities([...resp.activities])
        })
    },[])
    return (
        <div>
            <HorizontalBar />
            <div>
                {
                    activities.map((item, key) => (
                        <div key={key}>
                            <p>{formatDateTime(item.time)}</p>
                            <h1 className='font-bold'>{item.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: item.message }} />
                            <HorizontalBar/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Activities