"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Input from '@/components/TextInput'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import * as yup from 'yup'
import CompletedBar from '../../CompletedBar'
import handleToast from '@/components/handleToast'
const validationSchema = yup.object().shape({
  email: yup.string().email()
})

interface Step4Props {
  addNewEmailAsVerifier: (email: string, showcase_id: number) => Promise<ServerMessageInterface>,
  showcase_id: number,
  deleteVerifier: (email: string, showcase_id: number) => Promise<ServerMessageInterface>
}


const Step4: FC<Step4Props> = ({ addNewEmailAsVerifier, showcase_id, deleteVerifier }) => {
  const history = useRouter();
  const initialValues: { email: string, emails: string[] } = {
    email: "",
    emails: [],
  }
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          history.push("/showcase/create/step-4")
        }, 3000)

      }}
      initialValues={initialValues}
      validationSchema={validationSchema}

    >
      {
        ({ values, errors, touched, handleChange, isSubmitting, handleSubmit, submitForm, setValues, setErrors, setTouched }) => {
          const deleteItem = (id: number) => {
            deleteVerifier(values.emails[id], showcase_id).then((res) => {
              handleToast(res);
              if (res.success) {
                let items = values.emails;
                items.splice(id, 1);
                setValues({ ...values, emails: items });
              }
            })
          }

          
          const addItemToList = () => {
            if (!values.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
              setErrors({ ...errors, email: "Invalid email address" })
              setTouched({ ...touched, email: true })
              return;
            }
            if (values.email.length <= 2) {
              setErrors({ ...errors, email: "Minimum length should be 3" })
              setTouched({ ...touched, emails: true })
              return;
            }
            addNewEmailAsVerifier(values.email, showcase_id).then((res) => {
              handleToast(res);
              if (res.success) {
                setValues({ ...values, emails: [...values.emails, values.email], email: "" })
              }
            })

          }
          return <form onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItemToList();
            }
          }} onSubmit={handleSubmit} className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <CompletedBar done={4} />
            <div className='w-[500px]'>
              <div className='border h-[100px] border-gray-300 rounded-lg mb-10 p-2 flex flex-wrap gap-1 overflow-y-scroll'>
                {
                  values.emails.map((item, key) => (<p key={key}
                    className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                  >{item}
                    <button type='button' onClick={() => deleteItem(key)} className='flex items-center justify-center cursor-pointer'>
                      <i className="fa-solid fa-x text-[10px] ml-2"></i>
                    </button>

                  </p>))
                }
              </div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Verification Pannel</label>
              <p
                className='text-gray-500 text-[12px] mb-2'
              >
                Add peoples who can confirm this is your project. We will send email to them so that they can verify.
              </p>
              <Input value={values.email} onChange={handleChange} error={errors.email} name='email' show={touched.email ? true : false} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[500px]" placeholder="ist-hub@ist.edu.bd" />
              <div className="flex w-full items-center justify-end mt-5">
                <button onClick={(e) => {
                  e.preventDefault();
                  addItemToList();
                }} type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[100px] flex justify-center items-center">
                  ADD
                </button>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[150px] flex justify-center items-center">
                  {
                    isSubmitting ? <ButtonSpinner size={20} /> : "SAVE"
                  }
                </button>
              </div>
            </div>
          </form>

        }
      }
    </Formik>

  )
}

export default Step4