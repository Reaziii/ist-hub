"use client"
import BorderWrapper from '@/components/BorderWrapper'
import ButtonSpinner from '@/components/ButtonSpinner'
import TextArea from '@/components/TextArea'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import React, { FC } from 'react'
import * as yup from 'yup'

const ValidationSchema = yup.object().shape({
    title: yup.string().min(10, "Title should minimum 10 characters").max(50, "Title should be more then 50 character").required("Title is required"),
    report: yup.string().min(20, "Report should minimum 20 characters").max(500, "Report should be more then 500 character").required("Report is required"),
})

interface Props {
    create: (title: string, report: string) => Promise<ServerMessageInterface & { report?: ReportInterface }>,
    add: (report: ReportInterface) => void
}


const CreateReport: FC<Props> = ({ create, add }) => {
    return (
        <BorderWrapper>
            <div>
                <h1 className='font-bold text-[20px]'>
                    Post new report
                </h1>
                <Formik
                    onSubmit={(values, { setSubmitting }) => {
                        create(values.title, values.report).then(resp => {
                            handleToast(resp);
                            setSubmitting(false)
                            if (resp.report) add(resp.report)

                        })

                    }}
                    initialValues={{
                        title: "",
                        report: ""
                    }}
                    validationSchema={ValidationSchema}
                >
                    {
                        ({ values, errors, touched, handleChange, isSubmitting, handleSubmit }) => {
                            return <form onSubmit={handleSubmit}>
                                <div>
                                    <p className='mt-[20px] mb-2 font-bold'>Title of the report</p>
                                    <Input onChange={handleChange} value={values.title} error={errors.title} name='title' show={touched.title ? true : false} placeholder='Title of the report' />
                                </div>
                                <div>
                                    <p className='mt-[20px] mb-2 font-bold'>Report</p>
                                    <TextArea onChange={handleChange} value={values.report} error={errors.report} name='report' show={touched.report ? true : false} placeholder='Title of the report' className='h-[150px]' />
                                </div>
                                <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 mt-[20px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px] flex justify-center items-center">
                                    {
                                        isSubmitting ? <ButtonSpinner size={20} /> : "POST REPORT"
                                    }
                                </button>
                            </form>
                        }
                    }

                </Formik>
            </div>
        </BorderWrapper>
    )
}

export default CreateReport