import React, { FC } from 'react'
import Input from '@/components/Input'
import { registration } from '@/lib/auth'
import Form from './Form'
const Registration = async () => {
    const handleRegistration = async (form: FormData) => {
        "use server"
        return await registration(form);
    }
    return (
        <div className='flex bg-[#F7FAFC]'>
           
            <div
                className='h-[100vh] w-[40%] bg-main relative flex items-center'
            >
                <img src="/registration-bg.svg" alt="registration" className='w-full absolute right-[-100px]' />
            </div>
            <div className='ml-[60px] w-[60%] pr-[40px] box-border '>
                <h1 className='mt-[80px] font-bold mb-[40px] text-[24px]'>Registration</h1>
                <Form action={handleRegistration}  className='w-full'>
                    <div className='w-full flex justify-between mb-[20px]'>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Your Full Name</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your full name'
                                name='name'
                                required={true}
                            />
                        </div>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Your Email Address</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your Email name'
                                name='email'
                                required={true}
                                type='email'
                            />
                        </div>

                    </div>
                    <div className='w-full flex justify-between mb-[20px]'>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Your Department</p>
                            <select
                                name='department'
                                className='h-[35px] w-full text-[12px] outline-none border border-[#c8c8c8] rounded-lg'
                            >
                                <option value={"CSE"}>CSE</option>
                                <option value={"ECE"}>ECE</option>
                                <option value={"BBA"}>BBA</option>
                                <option value={"Deploma"}>Deploma</option>
                            </select>

                        </div>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Your Batch No</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your Batch No (Ex: 26)'
                                type='number'
                                name='batch'
                                required={true}
                            />
                        </div>

                    </div>
                    <div className='w-full flex justify-between mb-[20px]'>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Your Campus Roll No</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your campus roll no'
                                type='number'
                                name='roll'
                                required={true}
                            />
                        </div>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Your Phone No</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='your Phone No (EX: 017xxxxxxxx)'
                                name='phone'
                                required={true}
                            />
                        </div>

                    </div>
                    <div className='w-full flex justify-between mb-[20px]'>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Password</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='Password'
                                type='password'
                                name='password'
                                required={true}
                            />
                        </div>
                        <div className='w-[49%]'>
                            <p className='text-[12px] mb-[10px]'>Confirm Password</p>
                            <Input
                                className='h-[35px] w-full text-[12px] outline-none'
                                placeholder='Confirm Password'
                                type='password'
                                name='con-pass'
                                required={true}
                            />
                        </div>
                    </div>

                    <button
                        className='h-[40px] w-[49%] bg-main text-white rounded-lg font-bold mt-[30px] mb-[40px]'
                        value={"submit"}>Submit</button>
                    <br />
                    <a className='text-[14px]' href='/login'>Already Have an account?</a>
                </Form>
            </div>
        </div>
    )
}

export default Registration