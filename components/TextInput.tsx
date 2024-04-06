import React, { ChangeEventHandler } from 'react'

interface InputProps {
    type?: string,
    placeholder?: string,
    required?: boolean,
    name?: string,
    className?: string,
    error?: string,
    value?: string | number,
    onChange?: ChangeEventHandler,
    id?: string,
    show: boolean,
}

const Input = (props: InputProps) => {
    return (
        <>
            <input {...props} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500 ${props.className ?? ""} ${props.show && props.error ? "border-red-500 outline-none focus:border-red-500" : ''}`} />
            <p className="text-red-500 text-[12px] h-[12px]">{props.show ? props.error : ""}</p>
        </>
    )
}

export default Input