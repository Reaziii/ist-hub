import React, { FC } from 'react'
import ButtonSpinner from './ButtonSpinner'

const NotUpdated: FC<{ message?: string }> = ({ message }) => {
    return (
        <div className='w-full h-[100px] flex items-center justify-center flex-col text-gray-600 font-bold gap-5'>
            <ButtonSpinner />
            {message?.length ? message : "Not Updated Yet"}
        </div>
    )
}

export default NotUpdated