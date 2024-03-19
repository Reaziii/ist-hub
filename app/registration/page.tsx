import conn from '@/lib/mysql'
import React, { FC } from 'react'
import Image from 'next/image'
import { TextField } from '@mui/material'
import Input from '@/components/Input'
const Registration: FC<React.ReactNode> = () => {
    conn.query("SELECT * FROM Persons", (err, res) => {
        if (err) {
            console.log("Connection failed")
        }
        else {
            console.log("connected")
        }
    })
    return (
        <div className='flex'>
            <div
                className='h-[100vh] w-[40%] bg-main relative flex items-center'
            >
                <img src="/registration-bg.svg" alt="registration" className='w-full absolute right-[-100px]' />
            </div>
            <div className='ml-[60px] mt-[100px]'>
                <form>
                    <div>
                        <input
                            className='h-[40px]'
                            placeholder='your full name'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration