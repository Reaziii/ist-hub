"use client"
import AdminDashboard from '@/components/AdminDashboard'
import React, { FC } from 'react'
import Activities from './Activities'

interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    getActivities: (adminid?: string) => Promise<ServerMessageInterface & { activities: ActivitiesInterface[] }>,
    adminid: string
}

const ActivitiesDashboard: FC<Props> = ({ getProfileDetails, getActivities, adminid }) => {
    return (
        <AdminDashboard getProfileDetails={getProfileDetails} active='Admin Accounts'>
            {
                () => {
                    return (
                        <div className='border rounded-lg p-[20px] overflow-hidden bg-white relative mb-[100px] flex-column'>
                            <h1 className='font-bold text-[20px]'>Activities</h1>
                            <Activities adminid={adminid} getActivities={getActivities} />
                        </div>
                    )
                }
            }
        </AdminDashboard>
    )
}

export default ActivitiesDashboard