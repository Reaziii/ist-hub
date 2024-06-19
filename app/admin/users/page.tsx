import { getProfileDetails } from '@/lib/admin/admin'
import React from 'react'
import Users from './Users'
import { getAllUsers } from '@/lib/admin/users'

const Page = () => {
    return (
        <Users getProfileDetails={getProfileDetails} getUsers={getAllUsers} />
    )
}


export default Page