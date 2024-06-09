"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik, FormikProps } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as yup from 'yup'

interface LoginProps {
    email: string,
    password: string,
    remember: boolean
}
interface Props{ 
    login: (params: { email: string, password: string }) => Promise<{ success: boolean, msg: string, token?: string }> 
}
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    remember: yup.boolean().default(false),
});
const LoginForm: React.FC<Props> = ({ login }) => {
    let initialValues: LoginProps = {
        email: "",
        password: "",
        remember: false
    }
    let router = useRouter();
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: any, { setSubmitting }) => {
                login(values).then(res => {
                    handleToast(res);
                    if (res.success) {
                        localStorage.setItem("token", res.token as string)
                        router.push("/")
                    }
                    setSubmitting(false);
                }).catch(() => setSubmitting(false))
            }}
            validationSchema={schema}
        >
            {({ isSubmitting, handleSubmit, values, handleChange, errors, touched }: FormikProps<LoginProps>) => {
                return (
                    <section className="bg-gray-50 ">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                        Sign in to your account
                                    </h1>
                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                            <Input show={touched.email ? true : false} error={errors.email} value={values.email} onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500" placeholder="name@company.com" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                            <Input show={touched.password ? true : false} error={errors.password} value={values.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     :ring-blue-500 :border-blue-500" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input value={values.remember ? "true" : "false"} onChange={handleChange} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :ring-primary-600" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label className="text-gray-500 ">Remember me</label>
                                                </div>
                                            </div>
                                            <a href="/forget-password" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                                        </div>
                                        <button type="submit" className="w-full flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSubmitting}>
                                            {
                                                isSubmitting ? <ButtonSpinner size={20} /> : "Sign in"
                                            }
                                        </button>
                                        <p className="text-sm font-light text-gray-500 ">
                                            Don’t have an account yet? <a href="/registration" className="font-medium text-primary-600 hover:underline ">Sign up</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }}

        </Formik>
    )
}

export default LoginForm