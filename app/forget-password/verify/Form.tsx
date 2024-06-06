"use client"
import handleToast from '@/components/handleToast'
import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
interface Props{
    children: React.ReactNode, 
    action?: (form: FormData) => Promise<{ success: boolean, msg: string, token?: string }>,
    className?: string 
}
const Form: React.FC<Props> = ({ children, action, className }) => {
    const handleSubmit = (form: FormData) => {
        action?.call(null, form).then((res) => {
            handleToast(res);
        })
    }
    return (
        <>
            <form action={handleSubmit} className={className}>{children}</form>
        </>
    )
}

export default Form