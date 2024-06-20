import { getProfileDetails } from '@/lib/admin/admin'
import React from 'react'
import Users from './Users'
import { deleteAnUser, getAllUsers, toogleVerified } from '@/lib/admin/users'

const Page = () => {
    return (
        <Users getProfileDetails={getProfileDetails} getUsers={getAllUsers} deleteUser={deleteAnUser} toggleVerify={toogleVerified} />
    )
}


export default Page