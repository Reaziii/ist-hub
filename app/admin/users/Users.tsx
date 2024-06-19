"use client"
import AdminDashboard from '@/components/AdminDashboard'
import React, { FC, useEffect, useState } from 'react'
import UsersCard from './UsersCard'
import { UserSearchParams } from './SearchBar'
interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    getUsers: (params: UserSearchParams) => Promise<ServerMessageInterface & { users: UserInterface[] }>

}
const Users: FC<Props> = ({ getProfileDetails, getUsers }) => {
    return (
        <AdminDashboard getProfileDetails={getProfileDetails} active='Users'>
            {
                ({ admin, setAdmin }) => {
                    return <UsersCard getUsers={getUsers} />
                }
            }
        </AdminDashboard>
    )
}



export default Users