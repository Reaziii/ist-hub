import Header from '@/components/Header'
import Input from '@/components/Input'
import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'

const Verify:React.FC<{searchParams?: { [key: string]: string | string[] | undefined }}> = ({searchParams}) => {
    let email = searchParams?.email || null;
    if(!email){
        redirect("/")
    }
    const handleSubmit = async ()=>{
        "use server"
        redirect("/")
    }
    return (
        <>
            <Header />
            <div className='flex justify-center items-center w-full h-[100vh]'>
                <div className="w-[400px] shadow-[0_6px_12px_-2px_rgba(50,50,93,.25),0_3px_7px_-3px_rgba(0,0,0,.3)] rounded-lg box-border p-[40px]">
                    <form action={handleSubmit}>
                        <h1 className='font-bold text-[20px]'>Verify Email</h1>
                        <Input className='w-full mt-[40px] h-[40px] text-[14px]' type="text" placeholder='Enter Code' />
                        <p className='text-[12px] mt-[20px]'>We have sended an code to <span className='font-bold'>{email}</span>. please check your email.</p>
                        <button
                            className='h-[40px] w-[49%] bg-main text-white rounded-lg font-bold mt-[30px] mb-[40px]'
                            value={"submit"}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Verify