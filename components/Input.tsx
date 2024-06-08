import React, { FC } from 'react'
type props = {
    className: string,
    placeholder?: string | undefined,
    value?: string | undefined,
    name?: string | undefined,
    type?: string,
    required?: boolean
}
const Input: FC<props> = ({ className, placeholder, value, name, type, required }) => {
    return (
        <input className={`pl-[10px] box-border border border-[#c8c8c8] rounded-lg outline-none ${className}`} placeholder={placeholder} value={value} name={name} type={type} required={required} />
    )
}

export default Input