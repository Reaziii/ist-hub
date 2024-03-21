import Header from '@/components/Header'
import Input from '@/components/Input'
import { forgetpassword } from '@/lib/auth'
import React from 'react'
import Form from './Form'

const ForgetPassword = () => {
    const handleSubmit = async (form: FormData) => {
        "use server"
        return await forgetpassword(form)
    }
    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-[100vh]'>
                <Form action={handleSubmit} className="w-[400px] shadow-[0_6px_12px_-2px_rgba(50,50,93,.25),0_3px_7px_-3px_rgba(0,0,0,.3)] rounded-lg box-border p-[40px]">
                    <h1 className='font-bold text-[20px]'>Forget Password?</h1>
                    <p className='text-[14px] mb-[10px] mt-[20px]'>Enter you email address</p>
                    <Input
                        className='w-full h-[40px] text-[14px]'
                        placeholder='Your email address'
                        name='email'
                        type='email'
                        required
                    />
                    <p className='text-[12px] mb-[10px] mt-[10px]'>Please Enter your email. We will send a short verification code in your email.</p>
                    <button className='h-[40px] w-[49%] bg-main text-white rounded-lg font-bold mt-[30px] mb-[40px]'>Next</button>
                </Form>
            </div>
        </>
    )
}

export default ForgetPassword