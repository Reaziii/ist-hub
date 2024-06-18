import React, { FC } from 'react'
import { login } from '@/lib/auth'
import LoginForm from './LoginForm'
const LoginPage = async () => {

    return (
        <LoginForm login={login} />
    )
}

export default LoginPage