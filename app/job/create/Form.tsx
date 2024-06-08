"use client"
import { Formik } from "formik"
import TextInput from '@/components/TextInput'
import * as yup from 'yup'
import TextArea from "@/components/TextArea"
import Select from "@/components/SelectInput"
import { EmployeeType } from "@/constants"
import ButtonSpinner from "@/components/ButtonSpinner"
import React from 'react'
import handleToast from "@/components/handleToast"
import Toaster from "@/app/Toaster"

const validateSchema = yup.object().shape({
    title: yup.string().required("title is required").min(6),
    company: yup.string().required("Company name is required").min(6),
    company_email: yup.string().required("Company email is required").email().min(6),
    website: yup.string().required("Company website is required").url().min(6),
    address: yup.string().required("Company Address is required").min(10),
    description: yup.string().required("Job description is required").min(20),
    type: yup.string().required("Type is required"),

})

interface Props {
    create: (params: JobInterface) => Promise<ServerMessageInterface & { job_id?: string }>
}

const CreateJobForm: React.FC<Props> = ({ create }) => {
    let inititalValues: JobInterface & { tempTag: string, _isActive: "YES" | "NO" } = {
        title: "",
        description: "",
        userid: "",
        _id: "",
        company: "",
        company_email: "",
        website: "",
        type: EmployeeType.FULL_TIME,
        tags: [],
        tempTag: "",
        address: "",
        isActive: true,
        _isActive: "YES",
        createdAt: new Date(),
        updatedAt : new Date()

    }
    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] pt-[0px] overflow-hidden bg-white relative mb-[100px]'>
            <div className="flex items-center justify-between p-5 pl-0 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create new job
                </h3>
            </div>
            <Toaster />
            <Formik
                initialValues={inititalValues}
                onSubmit={(values, { setSubmitting }) => {
                    create(values).then(res => {
                        values.isActive = values._isActive === "YES"
                        handleToast(res)
                        setSubmitting(false)
                        if (res.success) {

                        }
                    })
                }}
                validationSchema={validateSchema}
            >

                {({ values, errors, handleChange, touched, setValues, setErrors, setTouched, isSubmitting, handleSubmit }) => {
                    const deleteItem = (id: number) => {
                        let items = values.tags;
                        items.splice(id, 1);
                        setValues({ ...values, tags: items });
                    }

                    const addItemToList = () => {
                        if (values.tempTag.length <= 3) {
                            setErrors({ ...errors, tempTag: "Minimum length should be 3" })
                            setTouched({ ...touched, tempTag: true })
                            return;
                        }
                        setValues({ ...values, tags: [...values.tags, { tag: values.tempTag, job_id: "", _id: "" }], tempTag: "" })
                    }
                    return (
                        <form onSubmit={handleSubmit}>
                            <p className="mt-[20px] font-bold">
                                Title of the job
                            </p>
                            <TextInput name="title" value={values.title} error={errors.title} onChange={handleChange} show={touched.title ? true : false} className="w-full mt-[10px]" placeholder="Title of the job" />

                            <p className="mt-[20px] font-bold">
                                Desciptioin of the job
                            </p>
                            <TextArea name="description" value={values.description} error={errors.description} onChange={handleChange} show={touched.description ? true : false} className="w-full mt-[10px] h-[200px]" placeholder="Write the description and requirements" />

                            <p className="mt-[20px] font-bold">
                                Tags of the job
                            </p>
                            <div className='border h-[100px] border-gray-300 rounded-lg mb-2 p-2 flex flex-wrap gap-1 overflow-y-scroll mt-[10px]'>
                                {
                                    values.tags.map((item, key) => (<p key={key}
                                        className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                                    >{item.tag}
                                        <button type='button' onClick={() => deleteItem(key)} className='flex items-center justify-center cursor-pointer'>
                                            <i className="fa-solid fa-x text-[10px] ml-2"></i>
                                        </button>

                                    </p>))
                                }
                            </div>
                            <div className="flex items-center gap-1">


                                <TextInput
                                    name="tempTag"
                                    value={values.tempTag}
                                    error={values.tempTag}
                                    show={touched.tempTag ? false : false}
                                    onChange={handleChange}
                                    placeholder="Add new tag"
                                />

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    addItemToList();
                                }} type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[100px] flex justify-center items-center">
                                    ADD
                                </button>
                            </div>
                            <p className="mt-[20px] font-bold">
                                Company name
                            </p>
                            <TextInput name="company" value={values.company} error={errors.company} onChange={handleChange} show={touched.company ? true : false} className="w-full mt-[10px]" placeholder="Name of the company" />
                            <p className="mt-[20px] font-bold">
                                Company email
                            </p>
                            <TextInput name="company_email" value={values.company_email} error={errors.company_email} onChange={handleChange} show={touched.company_email ? true : false} className="w-full mt-[10px]" placeholder="Email of the company" />
                            <p className="mt-[20px] font-bold">
                                Company Website
                            </p>
                            <TextInput name="website" value={values.website} error={errors.website} onChange={handleChange} show={touched.website ? true : false} className="w-full mt-[10px]" placeholder="Website of the company" />
                            <p className="mt-[20px] font-bold">
                                Company address
                            </p>
                            <TextInput name="address" value={values.address} error={errors.address} onChange={handleChange} show={touched.address ? true : false} className="w-full mt-[10px]" placeholder="Address of the company" />

                            <p className="mt-[20px] font-bold">
                                Job Type
                            </p>

                            <Select
                                show={touched.type ? true : false}
                                value={values.type}
                                name='type'
                                error={errors.type}
                                required
                                onChange={handleChange}
                                className="mt-[10px]"

                            >
                                <option value={EmployeeType.PART_TIME}>{EmployeeType.PART_TIME}</option>
                                <option value={EmployeeType.FULL_TIME}>{EmployeeType.FULL_TIME}</option>
                                <option value={EmployeeType.FREELANCE}>{EmployeeType.FREELANCE}</option>
                                <option value={EmployeeType.INTERNSHIP}>{EmployeeType.INTERNSHIP}</option>
                            </Select>

                            <p className="mt-[20px] font-bold">
                                Is Active?
                            </p>

                            <Select
                                show={touched._isActive ? true : false}
                                value={values._isActive}
                                name='_isActive'
                                error={errors._isActive}
                                required
                                onChange={handleChange}
                                className="mt-[10px]"
                            >
                                <option value={"YES"}>{"YES"}</option>
                                <option value={"NO"}>{"NO"}</option>
                            </Select>

                            <div className="mt-[30px] flex items-center p-5 pl-0 border-t border-gray-200 rounded-b dark:border-gray-600 pl-[0px]">
                                <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px] flex justify-center items-center">
                                    {
                                        isSubmitting ? <ButtonSpinner size={20} /> : "POST JOB"
                                    }
                                </button>
                                <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Descard</button>
                            </div>

                        </form>
                    )
                }}

            </Formik>
        </div>
    )
}

export default CreateJobForm