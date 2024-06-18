import React from 'react'
import LoginForm from './LoginForm'
import { Admin, Login } from '@/lib/admin/auth'
import { redirect } from 'next/navigation';

const Page = async () => {
    let user = await Admin();
    if(user.admin){
        redirect("/admin/update-admin")
    }
    return (
        <LoginForm login={Login} />
    )
}

export default Page