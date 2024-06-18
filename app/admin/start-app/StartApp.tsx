"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import React from 'react'
interface Props {
    createAdminSendLink: (email: string) => Promise<ServerMessageInterface>
}
const StartApp: React.FC<Props> = ({ createAdminSendLink }) => {
    return (

        <Formik
            onSubmit={(values, { setSubmitting }) => {
                createAdminSendLink(values.email).then(resp => {
                    handleToast(resp)
                    setSubmitting(false);
                })
            }}
            initialValues={{
                email: ""
            }}
        >
            {
                ({ handleSubmit, values, touched, errors, handleChange, isSubmitting }) => {
                    return (
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className='w-[400px] bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0'>
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                        Create Admin
                                    </h1>
                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                            <Input show={touched.email ? true : false} error={errors.email} value={values.email} onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500" placeholder="name@company.com" />
                                        </div>
                                        <button type="submit" className="w-full flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSubmitting}>
                                            {
                                                isSubmitting ? <ButtonSpinner size={20} /> : "Send invitation link"
                                            }
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>

                    )
                }

            }
        </Formik>
    )
}

export default StartApp