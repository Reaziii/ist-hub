"use client"
import React, { FC } from 'react'
import AdminDashboard from '@/components/AdminDashboard'
import UpdateAdmin from './UpdateForm'
interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    upload: (form: FormData) => Promise<ServerMessageInterface & { img?: string }>,
    updateProfile: (params: AdminUserInterface) => Promise<ServerMessageInterface>,


}
const Update: FC<Props> = ({ getProfileDetails, upload, updateProfile }) => {
    return (
        <AdminDashboard getProfileDetails={getProfileDetails} active='Update Admin'>
            {
                ({ admin, setAdmin }) => {
                    return (
                        <UpdateAdmin upload={upload} admin={admin} setAdmin={setAdmin} updateProfile={updateProfile}/>
                    )
                }
            }
        </AdminDashboard>
    )
}

export default Update