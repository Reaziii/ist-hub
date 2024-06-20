import React from 'react'
import ActivitiesDashboard from './ActivitiesDashboard'
import { getActivities, getProfileDetails } from '@/lib/admin/admin'

const ActivitiesPage = () => {
    return (
        <ActivitiesDashboard getActivities={getActivities} getProfileDetails={getProfileDetails} />
    )
}

export default ActivitiesPage