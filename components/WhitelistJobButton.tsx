"use client"
import React, { useState } from 'react'
import handleToast from './handleToast'
interface Props {
    whitelisted: boolean,
    toggleWhitelist: (job_id: string) => Promise<ServerMessageInterface>,
    job_id: string
}
const WhitelistJobButton: React.FC<Props> = ({ whitelisted, job_id, toggleWhitelist }) => {
    const [isWhitelisted, setIsWhitelisted] = useState(whitelisted)
    const [loading, setLoading] = useState(false);
    return (
        <>
            <button
                className="absolute right-[20px] top-[20px]"
                title="add to whitelist"
                onClick={() => {
                    if (loading)
                        return handleToast({ success: false, msg: "One request is pending" })
                    setLoading(true);
                    toggleWhitelist(job_id).then(result => {
                        handleToast(result)
                        if (result.success) {
                            setIsWhitelisted(!isWhitelisted)
                        }
                        setLoading(false);
                    })
                }}
            >
                {
                    !isWhitelisted ? <i className="fa-regular fa-bookmark text-[20px] "></i> : <i className="fa-solid fa-bookmark text-[20px] text-orange-400"></i>
                }
            </button>
        </>
    )
}

export default WhitelistJobButton