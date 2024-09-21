"use client"
import TextInput from '@/components/TextInput'
import { Formik } from 'formik'
import React from 'react'
import ButtonSpinner from '@/components/ButtonSpinner'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Search: React.FC = () => {
    const router = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const _skills: string | null = params?.get("skills") || null
    let inititalValues: {
        skills: string[],
        tempTag: ""
    } = {
        skills: _skills?.split(',') ?? [],
        tempTag: "",
    }

    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] pt-[0px] overflow-hidden bg-white relative mb-[10px]'>
            <Formik
                initialValues={inititalValues}
                onSubmit={(values, { setSubmitting }) => {
                    let x = values.skills.map(item => item).join(",");
                    setSubmitting(false);
                    router.push(path + "/?skills=" + x)
                }}
            >

                {({ values, errors, handleChange, touched, setValues, setErrors, setTouched, isSubmitting, handleSubmit }) => {
                    const deleteItem = (id: number) => {
                        let items = values.skills;
                        items.splice(id, 1);
                        setValues({ ...values, skills: items });
                    }

                    const addItemToList = () => {
                        if (values.tempTag.length <= 3) {
                            setErrors({ ...errors, tempTag: "Minimum length should be 3" })
                            setTouched({ ...touched, tempTag: true })
                            return;
                        }
                        setValues({ ...values, skills: [...values.skills, values.tempTag], tempTag: "" })
                    }
                    return (
                        <form onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                e.preventDefault();
                                addItemToList();
                            }

                        }} onSubmit={handleSubmit}>
                            <p className="mt-[20px] font-bold">
                                Skills
                            </p>
                            <div className='border h-[100px] border-gray-300 rounded-lg mb-2 p-2 flex flex-wrap gap-1 overflow-y-scroll mt-[10px]'>
                                {
                                    values.skills.map((item, key) => (<p key={key}
                                        className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                                    >{item}
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
                                    placeholder="add a skills"
                                />

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    addItemToList();
                                }} type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 w-[100px] flex justify-center items-center">
                                    ADD
                                </button>
                            </div>
                            <div className="mt-[30px] flex items-center p-5 pl-0 border-t border-gray-200 rounded-b dark:border-gray-600 pl-[0px]">
                                <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[180px] flex justify-center items-center">
                                    {
                                        isSubmitting ? <ButtonSpinner size={20} /> : "SEARCH PROFILE"
                                    }
                                </button>
                                <button
                                    onClick={() => {
                                        setValues({ ...values, skills: [], tempTag: "" })
                                    }}

                                    data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">RESET</button>
                            </div>

                        </form>
                    )
                }}

            </Formik>
        </div>
    )
}

export default Search