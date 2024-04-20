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
    disable?: boolean,
    default?: any
}

const Input = (props: InputProps) => {
    let temp: {
        type?: string,
        placeholder?: string,
        required?: boolean,
        name?: string,
        className?: string,
        error?: string,
        value?: string | number,
        onChange?: ChangeEventHandler,
        id?: string,
        show: boolean | string,
        disable?: boolean,
    } = { ...props };

    temp.show = "nothing"

    return (
        <>
            <input defaultValue={props.default} disabled={props.disable ? true : false} {...temp} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500 ${props.className ?? ""} ${props.show && props.error ? "border-red-500 outline-none focus:border-red-500" : ''}`} />
            <p className="text-red-500 text-[12px] h-[12px]">{props.show ? props.error : ""}</p>
        </>
    )
}

export default Input