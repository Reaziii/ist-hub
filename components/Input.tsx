import React, { FC } from 'react'
type props = {
    className:string,
    placeholder? : string | undefined,
    value?: string | undefined,
    name?:string | undefined,

}
const Input:FC<props> = ({className, placeholder, value, name}) => {
  return (
    <input className={`pl-[10px] box-border border border-[#c8c8c8] rounded-lg outline-none ${className}`} placeholder={placeholder} value={value} name={name}/>
  )
}

export default Input