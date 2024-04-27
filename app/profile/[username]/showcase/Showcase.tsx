"use client"
import ButtonSpinner from '@/components/ButtonSpinner';
import React, { FC, useEffect, useState } from 'react'
import AddShowcase from './AddShowcase';

const Showcase: FC = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>

                <h1 className='font-bold text-[20px]'>Showcase</h1>
                <div>
                    {
                        loading ? <div className='h-[100px] w-full flex items-center justify-center'>
                            <ButtonSpinner />
                        </div> :
                            <div className='mt-6'>

                            </div>
                    }
                </div>
                <AddShowcase />
            </div>
        </div>
    )
}

export default Showcase