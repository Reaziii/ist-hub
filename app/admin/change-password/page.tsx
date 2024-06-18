import React from 'react'
import ChangePassword from './ChangePassword'
import { getProfileDetails } from '@/lib/admin/admin'
import { changePassword } from '@/lib/admin/auth'

const Page = () => {
    return (
        <ChangePassword getProfileDetails={getProfileDetails} changePassword={changePassword}/>
    )
}

export default Page