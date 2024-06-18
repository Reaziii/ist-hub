import { logout } from '@/lib/admin/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Logout from './Logout'

const Page = async () => {

    return (
        <Logout logout={logout} />
    )
}

export default Page