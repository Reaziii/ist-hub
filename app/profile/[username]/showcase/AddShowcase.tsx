"use client"
import { useRouter } from 'next/navigation'
import React, {useState } from 'react'

const AddShowcase = () => {
    const history = useRouter();
    return (
        <>
            <button onClick={() =>{
                history.push("/showcase/create/step-1")
            }} className='absolute right-5 top-5 hover:bg-gray-100 h-10 w-10 border rounded-full transition-all'>
                <i className="fa-solid fa-plus"></i>
            </button>

        </>
    )
}

export default AddShowcase