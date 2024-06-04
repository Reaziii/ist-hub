"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import TextArea from '@/components/TextArea'
import * as yup from 'yup'
import { Formik } from 'formik'
import React, { FC } from 'react'
import { useRouter } from 'next/navigation'
import CompletedBar from '../../CompletedBar'
import handleToast from '@/components/handleToast'

const validationSchema = yup.object().shape({
  description: yup.string().required("required").min(20),
})


const Step2: FC<{ updateDetails: (details: string, showcase_id: string) => Promise<ServerMessageInterface>, showcase_id: string, description:string }> = ({ updateDetails, showcase_id, description }) => {
  const history = useRouter();
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        updateDetails(values.description, showcase_id).then(res => {
          handleToast(res);
          if (res.success) {
            return history.push("/showcase/update/step-3?showcase_id=" + showcase_id)
          }
          setSubmitting(false)
        })
      }}
      validationSchema={validationSchema}
      initialValues={{
        description: description
      }}

    >
      {
        ({ values, errors, touched, handleChange, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit} className='w-[100vw] h-[100vh] flex items-center justify-center pt-20'>
            <CompletedBar done={2} />
            <div className='w-[600px]'>
              <label className="block mb-2 text-sm font-bold text-gray-900">Showcase Description</label>
              <TextArea value={values.description} onChange={handleChange} error={errors.description} name='description' show={touched.description ? true : false} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[500px] h-[400px]" placeholder="Project Startiot" />
              <div className="flex w-full items-center justify-end mt-5">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[150px] flex justify-center items-center">
                  {
                    isSubmitting ? <ButtonSpinner size={20} /> : "NEXT"
                  }
                </button>
              </div>
            </div>
          </form>
        )
      }
    </Formik>

  )
}

export default Step2