"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as yup from 'yup'
import CompletedBar from '../../CompletedBar'
const validationSchema = yup.object().shape({
  name: yup.string().required().min(10)
})



const Step3 = () => {
  const history = useRouter();
  const initialValues: { name: string, names: string[] } = {
    name: "",
    names: [],
  }
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          history.push("/showcase/create/step-4")
        }, 3000)

      }}
      initialValues={initialValues}

    >
      {
        ({ values, errors, touched, handleChange, isSubmitting, handleSubmit, submitForm, setValues, setErrors, setTouched }) => {
          const deleteItem = (id: number) => {
            let items = values.names;
            items.splice(id, 1);
            setValues({ ...values, names: items });
          }
          const addItemToList = () => {
            if (values.name.length <= 2) {
              setErrors({ ...errors, name: "Minimum length should be 3" })
              setTouched({ ...touched, name: true })
              return;
            }
            setValues({ ...values, names: [...values.names, values.name], name: "" })
          }
          return <form onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItemToList();

            }
          }} onSubmit={handleSubmit} className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <CompletedBar done={3} />
            <div className='w-[500px]'>
              <div className='border h-[100px] border-gray-300 rounded-lg mb-10 p-2 flex flex-wrap gap-1 overflow-y-scroll'>
                {
                  values.names.map((item, key) => (<p key={key}
                    className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                  >{item}
                    <button type='button' onClick={() => deleteItem(key)} className='flex items-center justify-center cursor-pointer'>
                      <i className="fa-solid fa-x text-[10px] ml-2"></i>
                    </button>

                  </p>))
                }
              </div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Tags of the showcase</label>
              <Input value={values.name} onChange={handleChange} error={errors.name} name='name' show={touched.name ? true : false} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[500px]" placeholder="Nodejs" />
              <div className="flex w-full items-center justify-end mt-5">
                <div className="flex w-full items-center justify-end mt-5">
                  <button onClick={(e) => {
                    e.preventDefault();
                    addItemToList();
                  }} type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[100px] flex justify-center items-center">
                    ADD
                  </button>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[150px] flex justify-center items-center">
                    {
                      isSubmitting ? <ButtonSpinner size={20} /> : "NEXT"
                    }
                  </button>
                </div>
              </div>
            </div>
          </form>

        }
      }
    </Formik>

  )
}

export default Step3