import React, { FC } from 'react'
import ActivitiesDashboard from './ActivitiesDashboard'
import { getActivities, getProfileDetails } from '@/lib/admin/admin'
interface Props {
    params: {
        adminid: string
    }
}
const ActivitiesPage: FC<Props> = ({ params: { adminid } }) => {
    return (
        <ActivitiesDashboard adminid={adminid} getActivities={getActivities} getProfileDetails={getProfileDetails} />
    )
}

export default ActivitiesPage