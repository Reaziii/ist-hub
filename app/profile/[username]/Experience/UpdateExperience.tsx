"use client"
import React, { FC } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import Input from '@/components/TextInput'
import ButtonSpinner from '@/components/ButtonSpinner'
import { EmployeeType } from '@/constants'
import Select from '@/components/SelectInput'
import { formatDate } from '@/lib/utils'
const validationSchema = yup.object().shape({
    company_name: yup.string().required("required").min(10),
    title: yup.string().required("Title date is required"),
    location: yup.string().required("Location date is required"),
    start_date: yup.date().required(),

})
const UpdateExperience: FC<{ values: ExperieneInterfaces, close: () => void, update: (params: ExperieneInterfaces) => Promise<void>, deleteItem: () => Promise<void> }> = ({ close, update, values, deleteItem }) => {
    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                let finalValues: ExperieneInterfaces = {
                    ...values,
                    end_date: new Date(values.end_date),
                    start_date: new Date(values.start_date)
                }
                update(finalValues).then(() => {
                    setSubmitting(false);
                })
            }}
            initialValues={{
                start_date: formatDate(values.start_date ?? new Date()),
                end_date: formatDate(values.end_date ?? new Date()),
                employee_type: values.employee_type ?? EmployeeType.FULL_TIME,
                position: values.position ?? "",
                location: values.location ?? "",
                title: values.title ?? "",
                company_name: values.company_name ?? "",
                still: values.still,
                _id: values._id,
                userid: values.userid
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
                                                Update Experience
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
                                                Title
                                            </label>
                                            <Input name='title' onChange={handleChange} value={values.title} error={errors.title} show={touched.title ? true : false} placeholder='Senior Nextjs developer' className="w-full box-border" />

                                            <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                Employee Type
                                            </label>
                                            <Select
                                                show={touched.employee_type ? true : false}
                                                value={values.employee_type}
                                                name='employee_type'
                                                error={errors.employee_type as string}
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value={EmployeeType.PART_TIME}>{EmployeeType.PART_TIME}</option>
                                                <option value={EmployeeType.FULL_TIME}>{EmployeeType.FULL_TIME}</option>
                                                <option value={EmployeeType.FREELANCE}>{EmployeeType.FREELANCE}</option>
                                                <option value={EmployeeType.INTERNSHIP}>{EmployeeType.INTERNSHIP}</option>
                                                <option value={EmployeeType.SELF_EMPLOYED}>{EmployeeType.SELF_EMPLOYED}</option>
                                            </Select>
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Company Name
                                            </label>
                                            <Input name='company_name' onChange={handleChange} value={values.company_name} error={errors.company_name} show={touched.company_name ? true : false} placeholder='Google Inc' className="w-full box-border" />
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Location
                                            </label>
                                            <Input name='location' onChange={handleChange} value={values.location} error={errors.location} show={touched.location ? true : false} placeholder='Dhanmondi, Dhaka, Bangladesh' className="w-full box-border" />

                                            <div className='mt-2 flex w-full gap-2'>
                                                <div className='w-[50%]'>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                        Start Date
                                                    </label>
                                                    <Input name='start_date' onChange={handleChange} value={values.start_date} error={errors.start_date} show={touched.start_date ? true : false} className="w-full box-border" type='date' />
                                                </div>
                                                <div className={`w-[50%] ${values.still ? "opacity-50" : ""}`}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                                                        End Date <span className='text-gray-500 text-[12px]'>(leave if ongoing)</span>
                                                    </label>
                                                    <Input disable={values.still} name='end_date' onChange={handleChange} value={values.end_date} error={errors.end_date} show={touched.end_date ? true : false} className="w-full box-border" type='date' />
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <input name='still' onChange={(e) => {
                                                    setValues({ ...values, still: e.target.checked })
                                                }} id="default-checkbox" type="checkbox" checked={values.still} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am still working there</label>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[100px] flex justify-center items-center">
                                                {
                                                    isSubmitting ? <ButtonSpinner size={20} /> : "UPDATE"
                                                }
                                            </button>
                                            <button onClick={deleteItem} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</button>
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




export default UpdateExperience