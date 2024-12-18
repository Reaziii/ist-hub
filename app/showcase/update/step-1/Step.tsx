"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as yup from 'yup'
import CompletedBar from '../../CompletedBar'
import handleToast from '@/components/handleToast'

interface Props {
  name: string,
  updateShowcaseName: (_id: string, name: string) => Promise<ServerMessageInterface>,
  showcase_id: string
}
const validationSchema = yup.object().shape({
  name: yup.string().required().min(10)
})
const Step1: React.FC<Props> = ({ name, updateShowcaseName, showcase_id }) => {
  const history = useRouter();
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        updateShowcaseName(showcase_id, values.name).then(res => {
          handleToast(res);
          if (res.success) {
            history.push("/showcase/update/step-2?showcase_id=" + showcase_id)
          }
          setSubmitting(false);
        })
      }}
      initialValues={{
        name: name
      }}
      validationSchema={validationSchema}

    >
      {
        ({ values, errors, touched, handleChange, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit} className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <CompletedBar done={1} />
            <div className='w-[500px]'>
              <label className="block mb-2 text-sm font-bold text-gray-900">Name of the Showcase</label>
              <Input value={values.name} onChange={handleChange} error={errors.name} name='name' show={touched.name ? true : false} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[500px]" placeholder="Project Startiot" />
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

export default Step1