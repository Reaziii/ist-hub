"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { formatDate } from '@/lib/utils'
import { Formik } from 'formik'
import React, { FC, useState } from 'react'
import * as yup from 'yup'
const validationSchema = yup.object().shape({
    school: yup.string().required("required").min(10),
    degree: yup.string().required("required").min(3),
    start_date: yup.date().required("Start date is required"),
    end_date: yup.date()

})
const UpdateModal: FC<{ close: () => void, add: (params: EducationInterface) => Promise<void> }> = ({ close, add }) => {
    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                let finalValues: EducationInterface = {
                    ...values,
                    end_date: new Date(values.end_date),
                    start_date: new Date(values.start_date),
                    _id : "",
                    userid : ""
                }
                add(finalValues).then(() => {
                    setSubmitting(false)
                })
            }}
            initialValues={{
                school: "",
                degree: "",
                grade: 0,
                start_date: formatDate(new Date()),
                end_date: formatDate(new Date()),
                still: false
            }}
            validationSchema={validationSchema}
        >
            {
                ({ handleSubmit, values, handleChange, errors, touched, isSubmitting, setValues }) => {
                    return (
                        <form onSubmit={handleSubmit} className='fixed top-0 left-0 h-full w-full bg-[#00000081] z-20 flex justify-center items-center'>

                            <div id="default-modal" className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center  md:inset-0">
                                <div className="relative p-4 w-full max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Add Education
                                            </h3>
                                            <button onClick={() => close()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        <div className='w-[600px] box-border p-5 pt-5'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Institute Name
                                            </label>
                                            <Input name='school' onChange={handleChange} value={values.school} error={errors.school} show={touched.school ? true : false} placeholder='Institute of Science and Technology' className="w-full box-border" />
                                            <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                Degree
                                            </label>
                                            <Input name='degree' onChange={handleChange} value={values.degree} error={errors.degree} show={touched.degree ? true : false} placeholder='BSc in CSE' className="w-full box-border" />

                                            <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                Grade
                                            </label>
                                            <Input name='grade' onChange={handleChange} value={values.grade} error={errors.grade} show={touched.grade ? true : false} placeholder='4.00' className="w-full box-border" type='number' />
                                            <div className='mt-2 flex w-full gap-2'>
                                                <div className='w-[50%]'>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                        Start Date
                                                    </label>
                                                    <Input name='start_date' onChange={handleChange} value={values.start_date} error={errors.start_date} show={touched.start_date ? true : false} className="w-full box-border" type='date' />
                                                </div>
                                                <div className='w-[50%]'>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                        End Date <span className='text-gray-500 text-[12px]'>(leave if ongoing)</span>
                                                    </label>
                                                    <Input name='end_date' onChange={handleChange} value={values.end_date} error={errors.end_date} show={touched.end_date ? true : false} className="w-full box-border" type='date' />
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <input name='still' onChange={(e) => {
                                                    setValues({ ...values, still: e.target.checked })
                                                }} id="default-checkbox" type="checkbox" checked={values.still} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am still a student there</label>
                                            </div>
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

const AddEducation: FC<{ add: (params: EducationInterface) => Promise<void> }> = ({ add }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)} className='absolute right-5 top-5 hover:bg-gray-100 h-10 w-10 border rounded-full transition-all'>
                <i className="fa-solid fa-plus"></i>
            </button>
            {
                open && <UpdateModal close={() => { setOpen(false) }} add={add} />
            }
        </>
    )
}

export default AddEducation