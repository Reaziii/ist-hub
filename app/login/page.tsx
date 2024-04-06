import React, { FC } from 'react'
import Input from '@/components/Input'
import { login, registration } from '@/lib/auth'
import Form from './Form'
import LoginForm from './LoginForm'
const Registration = async () => {
    const handleRegistration = async (form: FormData) => {
        "use server"
        return await login(form);
    }
    return (
        <LoginForm />
    )
}

export default Registration