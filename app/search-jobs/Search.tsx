"use client"
import { EmployeeType } from '@/constants'
import TextInput from '@/components/TextInput'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import Select from '@/components/SelectInput'
import ButtonSpinner from '@/components/ButtonSpinner'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


const Search: React.FC = () => {
    const router = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const _tags: string | null = params.get("tags")
    const _type: string | null = params.get("type")
    let inititalValues: {
        type: string,
        tags: JobTagInterface[],
        tempTag: ""
    } = {
        type: _type ?? EmployeeType.FULL_TIME,
        tags: _tags && _tags.length > 0 ? _tags.split(',').map(item => ({ tag: item, _id: "", job_id: "" })) : [],
        tempTag: "",
    }

    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] pt-[0px] overflow-hidden bg-white relative mb-[10px]'>
            <Formik
                initialValues={inititalValues}
                onSubmit={(values, { setSubmitting }) => {
                    let x = values.tags.map(item => item.tag).join(",");
                    setSubmitting(false);
                    router.push(path + "/?tags=" + x + "&type=" + values.type)
                }}
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

                            <div className="mt-[30px] flex items-center p-5 pl-0 border-t border-gray-200 rounded-b dark:border-gray-600 pl-[0px]">
                                <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px] flex justify-center items-center">
                                    {
                                        isSubmitting ? <ButtonSpinner size={20} /> : "SEARCH JOB"
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

export default Search