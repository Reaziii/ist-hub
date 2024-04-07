import React, { FC } from 'react'
import { login } from '@/lib/auth'
import LoginForm from './LoginForm'
const Registration = async () => {

    return (
        <LoginForm login={login} />
    )
}

export default Registration