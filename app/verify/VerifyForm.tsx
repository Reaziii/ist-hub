"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import * as yup from 'yup'
const CodeVerificationSchema = yup.object().shape({
    code: yup.string().required("Please enter the varification code").min(6, 'Lenght must be 6 character').max(6, 'Length must be 6 character')
})

const VerifyForm: React.FC<{ email: string, handleVerify: (email: string, code: string) => Promise<{ success: boolean, msg: string }> }> = ({ email, handleVerify }) => {
    const route = useRouter();
    return (
        <Formik
            initialValues={{
                code: "",
                email: email
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleVerify(values.email, values.code).then(res => {
                    handleToast(res);
                    setSubmitting(false);
                    if (res.success) {
                        route.push("/login")
                    }
                })
            }}
            validationSchema={CodeVerificationSchema}
            enableReinitialize
            isInitialValid
        >
            {({ isSubmitting, values, handleChange, touched, handleSubmit, errors }) => {
                console.log(errors)
                console.log(touched)
                return <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Verify your email
                                </h1>
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input value={email} readOnly type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Verification code</label>
                                        <Input error={errors.code} onChange={handleChange} value={values.code} show={touched.code ? true : false} name="code" id="password" placeholder="aX6bFF" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        <p className="text-[12px] mt-4">*We have sent a verification code to your email. Please use this to verify your email address.</p>
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
            }}
        </Formik>
    )
}

export default VerifyForm