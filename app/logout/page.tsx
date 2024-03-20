"use client"
import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(() => {
        window.document.cookie = "token=;"
        window.location.href = "/login"
    }, [])
    return (
        <></>
    )
}

export default Logout