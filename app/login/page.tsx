import React, { FC } from 'react'
import Input from '@/components/Input'
import { login, registration } from '@/lib/auth'
import Form from './Form'
const Registration = async () => {
    const handleRegistration = async (form: FormData) => {
        "use server"
        return await login(form);
    }
    return (
        <div className='flex bg-[#F7FAFC]'>
           
            <div
                className='h-[100vh] w-[40%] bg-main relative flex items-center'
            >
                <img src="/registration-bg.svg" alt="registration" className='w-full absolute right-[-100px]' />
            </div>
            <div className='ml-[60px] w-[60%] pr-[40px] box-border pl-[40px]'>
                <h1 className='mt-[80px] font-bold mb-[40px] text-[24px]'>Login</h1>
                <Form action={handleRegistration}  className='w-full'>
                    <div className='w-full flex justify-between mb-[20px]'>
                        <div className='w-[50%]'>
                            <p className='text-[12px] mb-[10px]'>Your Full Name</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your full name'
                                name='email'
                                required={true}
                            />
                        </div>

                    </div>
                    <div className='w-full flex justify-between mb-[20px]'>
                        <div className='w-[50%]'>
                            <p className='text-[12px] mb-[10px]'>Your Full Name</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your password'
                                name='password'
                                required={true}
                                type='password'
                            />
                        </div>

                    </div>
                    

                    <button
                        className='h-[40px] w-[49%] bg-main text-white rounded-lg font-bold mt-[30px] mb-[40px]'
                        value={"submit"}>Submit</button>
                    <br />
                    <a className='text-[14px]' href='/registration'>Don't have account?</a>
                </Form>
            </div>
        </div>
    )
}

export default Registration