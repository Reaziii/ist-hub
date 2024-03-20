import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='h-[60px] w-full fixed bg-white flex px-[40px] box-border items-center justify-between z-10 border border-[#f9fafc]'>
            <p className='font-bold text-[20px]'>IST HUB</p>
            <div>

            </div>
            <div>
                <a href={"/login"}>Login</a>
                <span> | </span>
                <a href={"/registration"}>Registration</a>
            </div>
            
        </div>
    )
}

export default Header