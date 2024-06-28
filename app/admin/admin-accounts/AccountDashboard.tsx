"use client"
import AdminDashboard from '@/components/AdminDashboard'
import React, { FC } from 'react'
import AdminAccouts from './AdminAccouts'
interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    getAdmins: () => Promise<ServerMessageInterface & { admins: (AdminUserInterface & { invitedAdmin: string })[] }>,
    toggleAdminActive: (adminid: string) => Promise<ServerMessageInterface & { isMe?: boolean }>



}
const AccountDashboard: FC<Props> = ({ getProfileDetails, getAdmins, toggleAdminActive }) => {
    return (
        <AdminDashboard getProfileDetails={getProfileDetails} active='Admin Accounts'>
            {
                () => {
                    return <AdminAccouts toggleAdminActive={toggleAdminActive} getAdmins={getAdmins} />
                }
            }
        </AdminDashboard>
    )
}

export default AccountDashboard