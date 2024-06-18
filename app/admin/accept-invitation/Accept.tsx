"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import handleToast from '@/components/handleToast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface Props {
    accessToken: string,
    checkInvitation: (accessToken: string) => Promise<ServerMessageInterface>
}
const Accept: React.FC<Props> = ({  accessToken, checkInvitation }) => {
    let [status, setStatus] = useState({ msg: "", success: false, loading: true })
    const router = useRouter();
    useEffect(() => {
        checkInvitation(accessToken).then(resp => {
            if (resp.success) {
                router.push("/admin/update-admin")
            }
            else {
                setStatus({ ...resp, loading: false })
            }
        })
    }, [])
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            {
                status.loading ? <ButtonSpinner />
                    :
                    <h1 className="font-bold text-[24px]">{status.msg}</h1>
            }
        </div>
    )
}

export default Accept