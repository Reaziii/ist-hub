"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import Select from '@/components/SelectInput'
import Input from '@/components/TextInput'
import handleToast from '@/components/handleToast'
import { Formik, FormikProps } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
interface Props{ 
    handleRegistration: (
        name: string, 
        email: string, 
        dept: string, 
        batch: number, 
        roll: number, 
        phone: string, 
        pass: string, 
        conPass: string
    ) => Promise<{ success: boolean, msg: string }> 
}
interface RegistrationInterface {
    name: string,
    email: string,
    dept: string,
    batch: number,
    roll: number,
    phone: string,
    password: string,
    confirmPassword: string,
}

const registrationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    dept: yup.string().required().oneOf(['CSE', 'ECE', 'BBA', 'DEPLOMA']),
    batch: yup.number().required().positive().integer(),
    roll: yup.number().required().positive().integer(),
    phone: yup.string().required().min(11).max(11),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required("confirm password is a required field").oneOf([yup.ref('password'), ""], 'Passwords must match')
});


const RegistrationForm: React.FC<Props> = ({ handleRegistration }) => {
    let initialValues: RegistrationInterface = {
        name: "Reaz Ahammed",
        email: "baphonreaz@gmail.com",
        dept: "ECE",
        batch: 26,
        roll: 19057,
        phone: "01533523233",
        password: "reazreaz",
        confirmPassword: "reazreaz"
    }
    const router = useRouter();
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: RegistrationInterface, { setSubmitting, setErrors, setTouched }) => {
                handleRegistration(values.name, values.email, values.dept, values.batch, values.roll, values.phone, values.password, values.confirmPassword).then(res => {
                    handleToast(res);
                    setSubmitting(false);
                    if (res.success) {
                        localStorage.setItem("verifyemail", values.email);
                        router.push(`/verify/?email=${encodeURIComponent(values.email)}`)
                    }
                })
            }}
            validationSchema={registrationSchema}
            enableReinitialize
        >
            {({ handleSubmit, isSubmitting, handleChange, values, errors, touched }: FormikProps<RegistrationInterface>) => {
                return (
                    <section className="bg-gray-50 max-w-screen-xl mx-auto">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-full xl:p-0  ">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                        Create an account
                                    </h1>
                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                        <div className="flex items-start justify-between w-full gap-4">
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Full Name</label>
                                                <Input show={touched.name ? true : false} error={errors.name} onChange={handleChange} value={values.name} type="text" name="name" className="w-full" placeholder="Your Full Name" />
                                            </div>
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Email Address</label>
                                                <Input show={touched.email ? true : false} error={errors.email} onChange={handleChange} value={values.email} type="text" name="email" placeholder="user@example.com" className="w-full" />
                                            </div>
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Department</label>
                                                <Select show={touched.dept ? true : false} name='dept' onChange={handleChange} value={values.dept} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500">
                                                    <option value="CSE">CSE</option>
                                                    <option value="ECE">ECE</option>
                                                    <option value="BBA">BBA</option>
                                                    <option value="Deploma">DEPLOMA</option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex items-start justify-between w-full gap-4 mt-0">
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Batch No</label>
                                                <Input show={touched.batch ? true : false} error={errors.batch} onChange={handleChange} value={values.batch} type="number" name="batch" placeholder="EX: 26" className="w-full" />
                                            </div>
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Campus Roll No</label>
                                                <Input show={touched.roll ? true : false} error={errors.roll} onChange={handleChange} value={values.roll} type="number" name="roll" className="w-full" placeholder="EX: 19056" />
                                            </div>
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone No</label>
                                                <Input show={touched.phone ? true : false} error={errors.phone} onChange={handleChange} value={values.phone} type="text" name="phone" placeholder="017XXXXXXXX" className="w-full" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-[66.666%] gap-4">
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                                <Input show={touched.password ? true : false} error={errors.password} onChange={handleChange} value={values.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     :ring-blue-500 :border-blue-500" />
                                            </div>
                                            <div className='w-[50%]'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                                <Input show={touched.confirmPassword ? true : false} error={errors.confirmPassword} onChange={handleChange} value={values.confirmPassword} type="password" name="confirmPassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     :ring-blue-500 :border-blue-500" />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-[33%] flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSubmitting}>
                                            {
                                                isSubmitting ? <ButtonSpinner size={20} /> : "Create a new account"
                                            }
                                        </button>
                                        <p className="text-sm font-light text-gray-500 ">
                                            Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline ">Login here</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }}

        </Formik>
    )
}

export default RegistrationForm