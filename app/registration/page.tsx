import Input from '@/components/Input'
import conn from '@/lib/mysql'
import React, { FC } from 'react'
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
            <div className='ml-[60px] mt-[100px] w-[60%]'>
                <form className='w-full'>
                    <div className='w-full'>
                        <Input
                            className='h-[40px] w-[50%] text-[12px] outline-none'
                            placeholder='your full name'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration