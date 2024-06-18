"use client"
import AdminDashboard from '@/components/AdminDashboard'
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import React from 'react'
interface Props {
    sendAdminInvitationLink: (email: string) => Promise<ServerMessageInterface>,
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>,
}
const AddAdmin: React.FC<Props> = ({ sendAdminInvitationLink, getProfileDetails }) => {
    return (

        <AdminDashboard getProfileDetails={getProfileDetails} active='Add Admin'>
            {
                () => {
                    return (
                        <Formik
                            onSubmit={(values, { setSubmitting }) => {
                                sendAdminInvitationLink(values.email).then(resp => {
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
                                        <div className="px-6 py-8 mx-auto">
                                            <div className='w-full bg-white rounded-lg shadow'>
                                                <div className="p-6">
                                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                                        Create Admin
                                                    </h1>
                                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                                        <div>
                                                            <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 ">Email address</label>
                                                            <Input show={touched.email ? true : false} error={errors.email} value={values.email} onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500" placeholder="name@company.com" />
                                                        </div>
                                                        <button type="submit" className="w-[200px] flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSubmitting}>
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
            }
        </AdminDashboard>
    )
}

export default AddAdmin