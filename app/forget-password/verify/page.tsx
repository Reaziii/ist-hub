import Header from '@/components/Header'
import React from 'react'
import Form from '../Form'
import Input from '@/components/Input'
import { redirect } from 'next/navigation'
import { verifyAndChangePassword } from '@/lib/auth'
interface Props{
    searchParams?: { 
        [key: string]: string | string[] | undefined 
    } 
}
const Verify: React.FC<Props> = ({ searchParams }) => {
    let email = searchParams?.email || null;
    if (!email) {
        redirect("/")
    }
    const handleSubmit = async (form: FormData) => {
        "use server"
        form.set("email", email as string)
        return await verifyAndChangePassword(form);
    }

    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-[100vh]'>
                <Form action={handleSubmit} className="w-[400px] shadow-[0_6px_12px_-2px_rgba(50,50,93,.25),0_3px_7px_-3px_rgba(0,0,0,.3)] rounded-lg box-border p-[40px]">
                    <h1 className='font-bold text-[20px]'>Verify</h1>
                    <p className='text-[14px] mb-[10px] mt-[20px]'>OTP</p>
                    <Input
                        className='w-full h-[40px] text-[14px]'
                        placeholder='You OTP (ex : 2xAbcy)'
                        name='code'
                        type='text'
                        required
                    />
                    <p className='text-[12px] mt-[20px]'>We have sent an code to <span className='font-bold'>{email}</span>. please check your email.</p>
                    <p className='text-[14px] mb-[10px] mt-[20px]'>New password</p>
                    <Input
                        className='w-full h-[40px] text-[14px]'
                        placeholder='New password'
                        name='password'
                        type='password'
                        required
                    />
                    <p className='text-[14px] mb-[10px] mt-[20px]'>Confirm password</p>
                    <Input
                        className='w-full h-[40px] text-[14px]'
                        placeholder='Confirm password'
                        name='con-pass'
                        type='password'
                        required
                    />
                    <button className='h-[40px] w-[49%] bg-primary-700 text-white rounded-lg font-bold mt-[30px] mb-[40px]'>Next</button>
                </Form>
            </div>
        </>
    )
}

export default Verify