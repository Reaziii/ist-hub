import { getProfileDetails } from '@/lib/admin/admin'
import React from 'react'
import Users from './Users'
import { deleteAnUser, getAllUsers, impersonateLogin, toogleVerified } from '@/lib/admin/users'

const Page = () => {
    return (
        <Users impersonate={impersonateLogin} getProfileDetails={getProfileDetails} getUsers={getAllUsers} deleteUser={deleteAnUser} toggleVerify={toogleVerified} />
    )
}


export default Page