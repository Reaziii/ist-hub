"use client"
import React, { useEffect, useState } from 'react'
import UpdateProfilePicture from './UpdateProfilePicture'
import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import Input from '@/components/TextInput'
import * as yup from 'yup'
import HorizontalBar from '@/components/HorizontalBar'
import handleToast from '@/components/handleToast'
import ButtonSpinner from '@/components/ButtonSpinner'
interface Props {
    upload: (form: FormData) => Promise<ServerMessageInterface & { img?: string }>,
    admin: AdminUserInterface,
    setAdmin: (admin: AdminUserInterface) => void,
    updateProfile: (params: AdminUserInterface) => Promise<ServerMessageInterface>,
}


const validationSchema = yup.object().shape({
    name: yup.string().required("Full name is required").min(6).max(50),
    phone: yup.string().required("Phone is required").min(11).max(11),
})

const UpdateAdmin: React.FC<Props> = ({ upload, admin, setAdmin, updateProfile }) => {
    let initialValues: AdminUserInterface = {
        name: admin.name,
        phone: admin.phone,
        photo: admin.photo,
        email: admin.email,
        invitedBy: "",
        password: "",
        _id: admin._id,
        updated: admin.updated,
        isActive : true
    }
    return (
        <div className='border mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative mb-[100px] flex-column'>
            <UpdateProfilePicture upload={upload} oldPicture={admin.photo ?? ""} setProfilePic={(img: string) => { setAdmin({ ...admin, photo: img }) }} />
            <HorizontalBar />
            <Formik
                onSubmit={(values, { setSubmitting }) => {

                    updateProfile(values).then(resp => {
                        handleToast(resp)
                        setAdmin({ ...admin, name: values.name, phone: values.phone })
                        setSubmitting(false);
                    })
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {
                    ({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
                        return (
                            <form
                                onSubmit={handleSubmit}
                            >
                                <p className="mt-[20px] font-bold">
                                    Full Name
                                </p>
                                <Input name="name" value={values.name} error={errors.name} onChange={handleChange} show={touched.name ? true : false} className="w-full mt-[10px]" placeholder="Your full name" />
                                <p className="mt-[20px] font-bold">
                                    Phone NO
                                </p>
                                <Input name="phone" value={values.phone} error={errors.phone} onChange={handleChange} show={touched.phone ? true : false} className="w-full mt-[10px]" placeholder="Your Phone NO (ex: 017xxxxxxxx)" />
                                <HorizontalBar />
                                <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px] flex justify-center items-center">
                                    {
                                        isSubmitting ? <ButtonSpinner size={20} /> : "UPDATE"
                                    }
                                </button>
                            </form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default UpdateAdmin