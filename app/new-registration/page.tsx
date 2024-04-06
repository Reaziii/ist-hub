import { user } from '@/lib/user'
import { redirect } from 'next/navigation';
import React from 'react'

const Settings = async () => {
    const usr = await user();
    if (!usr.login) redirect("/login")
    return (
        <div>Settings</div>
    )
}

export default Settings