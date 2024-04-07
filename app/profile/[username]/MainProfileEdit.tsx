"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import React, { FC, useState } from 'react'
import * as yup from 'yup'
const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(4),
    bio: yup.string().required("Bio is required").min(20),
})
const UpdateModal: FC<{ params: { name: string, bio: string }, open: boolean, close: () => void, update: (name: string, bio: string) => Promise<ServerMessageInterface & { token?: string }> }> = ({ open, close, update, params }) => {
    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                update(values.name, values.bio).then(res => {
                    handleToast(res);
                    setSubmitting(false);
                    if (res.success) {
                        localStorage.setItem("token", res.token as string)
                        close();
                    }
                })
            }}
            initialValues={params}
            validationSchema={validationSchema}
        >
            {
                ({ handleSubmit, values, handleChange, errors, touched, isSubmitting }) => {

                    return (
                        <form onSubmit={handleSubmit} className='fixed top-0 left-0 h-full w-full bg-[#00000081] z-20 flex justify-center items-center'>

                            <div id="default-modal" className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center  md:inset-0">
                                <div className="relative p-4 w-full max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Update Profile
                                            </h3>
                                            <button onClick={() => close()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        <div className='w-[600px] box-border p-5'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Full Name</label>
                                            <Input name='name' onChange={handleChange} value={values.name} error={errors.name} show={touched.name ? true : false} placeholder='Your Full Name' className="w-full box-border" />
                                            <label className="block mb-2 text-sm font-medium text-gray-900 mt-3">Your Bio</label>
                                            <Input name='bio' onChange={handleChange} value={values.bio} error={errors.bio} show={touched.bio ? true : false} placeholder='Your Bio' className="w-full box-border" />
                                        </div>
                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[100px] flex justify-center items-center">
                                                {
                                                    isSubmitting ? <ButtonSpinner size={20} /> : "UPDATE"
                                                }
                                            </button>
                                            <button onClick={() => close()} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Descard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )
                }
            }

        </Formik>

    )
}

const MainProfileEdit: FC<{ params: { bio: string, name: string }, update: (name: string, bio: string) => Promise<ServerMessageInterface & { token?: string }> }> = ({ update, params }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)} className='absolute right-10 top-5 hover:bg-gray-100 h-10 w-10 border rounded-full transition-all'>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
            {
                open && <UpdateModal params={params} open={true} close={() => { setOpen(false) }} update={update} />
            }
        </>
    )
}

export default MainProfileEdit