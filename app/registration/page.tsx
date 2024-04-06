import React, { FC } from 'react'
import { registration } from '@/lib/auth'
import RegistrationForm from './RegistrationForm'
const Registration = async () => {
    return (
        <RegistrationForm handleRegistration={registration} />
    )
}

export default Registration