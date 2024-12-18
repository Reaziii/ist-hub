"use client"
import AdminDashboard from '@/components/AdminDashboard'
import React, { FC, useEffect, useState } from 'react'
import UsersCard from './UsersCard'
import { UserSearchParams } from './SearchBar'
interface Props {
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
    getUsers: (page: number, params: UserSearchParams) => Promise<ServerMessageInterface & { users: UserInterface[] }>,
    deleteUser: (userid: string) => Promise<ServerMessageInterface>,
    toggleVerify: (userid: string) => Promise<ServerMessageInterface>,
    impersonate: (userid: string) => Promise<ServerMessageInterface & { link?: string }>,



}
const Users: FC<Props> = ({ getProfileDetails, getUsers, deleteUser, toggleVerify, impersonate }) => {
    return (
        <AdminDashboard getProfileDetails={getProfileDetails} active='Users'>
            {
                ({ admin, setAdmin }) => {
                    return <UsersCard impersonate={impersonate} getUsers={getUsers} deleteUser={deleteUser} toggleVerify={toggleVerify} />
                }
            }
        </AdminDashboard>
    )
}



export default Users