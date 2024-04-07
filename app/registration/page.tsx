import React from 'react'
import { registration } from '@/lib/auth'
import RegistrationForm from './RegistrationForm'
import { user } from '@/lib/user'
import { redirect } from 'next/navigation'
const Registration = async () => {
    const usr = await user();
    if (usr.login) {
        redirect("/")
    }
    return (
        <RegistrationForm handleRegistration={registration} />
    )
}
export default Registration