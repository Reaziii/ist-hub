"use client"
import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
interface Props{ 
    children: React.ReactNode, 
    action?: (form: FormData) => Promise<{ success: boolean, msg?: string }>, 
    className?: string 
}
const Form: React.FC<Props> = ({ children, action, className }) => {
    const [status, setStatus] = useState<{ type: string | null, msg: string, open: boolean }>({
        type: null,
        msg: "",
        open: false
    })
    const handleSubmit = (form: FormData) => {
        action?.call(null, form).then((res) => {
            if (res?.success === true) {
                setStatus({
                    msg: res.msg ?? "",
                    open: true,
                    type: "success"

                })
                // window.location.href = "/verify?email="+form.get("email")
                window.location.href = "/login"
            } else {
                setStatus({
                    msg: res.msg ?? "",
                    open: true,
                    type: "error"

                })
            }
        })
    }
    return (
        <>
            <form action={handleSubmit} className={className}>{children}</form>
            <Snackbar
                open={status.open}
                autoHideDuration={6000}
                onClose={() => { setStatus({ open: false, msg: "", type: null }) }}
                message={status.msg}

            >
                <Alert
                    onClose={() => { setStatus({ open: false, msg: "", type: null }) }}
                    severity={status.type === "success" ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {status.msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Form