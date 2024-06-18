"use client"
import Toaster from '@/app/Toaster'
import Input from '@/components/TextInput'
import { Formik } from 'formik'
import React from 'react'
interface Props{
    email: string,
    code : String
}
const AcceptInvitation:React.FC<Props> = ({email, code}) => {
    const initialValues = {
        name : "",
        email: email,
        phone : "",
        photo : "",


    }
    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] pt-[0px] overflow-hidden bg-white relative mb-[100px]'>
            <div className="flex items-center justify-between p-5 pl-0 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Admin Profile
                </h3>
            </div>
            <Toaster />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                   
                }}
                // validationSchema={validateSchema}
            >

                {({ values, errors, handleChange, touched, setValues, setErrors, setTouched, isSubmitting, handleSubmit }) => {
                    
                    return (
                        <form onSubmit={handleSubmit}>
                            asdfasdf
                        </form>
                    )
                }}

            </Formik>
        </div>
    )
}

export default AcceptInvitation