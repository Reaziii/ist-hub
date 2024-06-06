"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import handleToast from '@/components/handleToast'
import { Formik } from 'formik'
import React, { FC, useRef, useState } from 'react'
interface Props{ 
    close: () => void, 
    upload: (file: FormData) => Promise<ServerMessageInterface>, 
    resume: string | null 
}
const UploadResume: FC<Props> = ({ close, upload, resume }) => {
    const fileref = useRef<HTMLInputElement>(null);
    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                let form = new FormData();
                form.append("file", values.file as File)
                upload(form).then((res) => {
                    handleToast(res)
                    setSubmitting(false);
                })
            }}
            initialValues={{
                resume,
                file: {}
            }}
        >
            {
                ({ handleSubmit, values, isSubmitting, setValues }) => {
                    return (
                        <form onSubmit={handleSubmit} className='fixed top-0 left-0 h-full w-full bg-[#00000081] z-20 flex justify-center items-center'>

                            <div id="default-modal" className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center  md:inset-0">
                                <div className="relative p-4 w-full max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <div className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Resume
                                            </div>
                                            <button onClick={() => close()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className='w-[600px] box-border p-5 pt-2'>
                                            <button onClick={() => {
                                                fileref.current?.click();
                                            }} type="button" className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Upload new resume</button>
                                            <input onChange={(e) => {
                                                if (e.target.files?.length)
                                                    setValues({
                                                        ...values,
                                                        resume: URL.createObjectURL(e.target.files[0]),
                                                        file: e.target.files[0]
                                                    })
                                            }} accept='application/pdf' ref={fileref} hidden type='file' />
                                        </div>
                                        <div>
                                            {
                                                values.resume?.length ? <iframe width={"100%"} className=' h-[60vh]' src={values.resume} /> : <h1 className="text-center my-2 mb-2">No Resume Has uploaded</h1>
                                            }
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


const Resume: FC<{ upload: (file: FormData) => Promise<ServerMessageInterface>, resume: string | null, owner: boolean }> = ({ upload, resume, owner }) => {
    const [openModal, setOpenModal] = useState(false);
    const openResume = () => {
        if (owner) {
            setOpenModal(true);
        }
        else {
            window.open(resume ?? "", "_blank")
        }
    }
    return (
        <>
            {openModal && <UploadResume resume={resume} close={() => { setOpenModal(false) }} upload={upload} />}
            <button onClick={openResume} type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-600 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 w-[150px] mt-[20px] absolute right-[20px] bottom-[20px]">RESUME</button>
        </>
    )
}


export default Resume