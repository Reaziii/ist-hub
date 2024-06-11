"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

interface Props {
    changePassword: (oldpassword: string, password: string, confirmpassword: string) => Promise<ServerMessageInterface>
}


const validationSchema = yup.object().shape({
    oldpassword: yup.string().required("current password is required").min(8),
    password: yup.string().required("new password is required").min(8),
    confirmpassword: yup.string().required("confirm password is a required").oneOf([yup.ref('password'), ""], 'Passwords must match')
})

const ChangePassword: React.FC<Props> = ({ changePassword }) => {
    return (
        <div className="flex w-full h-[100vh] justify-center items-center">
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    changePassword(values.oldpassword, values.password, values.confirmpassword).then(resp=>{
                        handleToast(resp);
                        setSubmitting(false);
                    })
                }}
                initialValues={{
                    password: "",
                    confirmpassword: "",
                    oldpassword: ""
                }}
                validationSchema={validationSchema}
            >
                {
                    ({ handleSubmit, errors, values, handleChange, touched, isSubmitting }) => {
                        return <section className="bg-gray-50 dark:bg-gray-900 w-[500px]">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Change Your Password
                                        </h1>
                                        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4" action="#">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                                <Input error={errors.oldpassword} onChange={handleChange} value={values.oldpassword} show={touched.oldpassword ? true : false} name="oldpassword" id="password" placeholder="********" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                                <Input error={errors.password} onChange={handleChange} value={values.password} show={touched.password ? true : false} name="password" id="password" placeholder="********" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                                <Input error={errors.confirmpassword} onChange={handleChange} value={values.confirmpassword} show={touched.confirmpassword ? true : false} name="confirmpassword" id="password" placeholder="********" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <button type="submit" className="w-full flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSubmitting}>
                                                {
                                                    isSubmitting ? <ButtonSpinner size={20} /> : "NEXT"
                                                }
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                }
            </Formik>
        </div>
    )
}

export default ChangePassword