import { user } from '@/lib/user'
import Link from 'next/link'
import React from 'react'

const Header = async () => {
    const usr = await user();
    return (
        <div className='h-[60px] w-full fixed bg-white flex px-[40px] box-border items-center justify-between z-10 border border-[#f9fafc]'>
            <p className='font-bold text-[20px]'>IST HUB</p>
            <div>

            </div>
            {
                usr.login === false ? <div>
                    <a href={"/login"}>Login</a>
                    <span> | </span>
                    <a href={"/registration"}>Registration</a>
                </div> : <div>
                    <a href="/">{usr.usr?.name}</a>
                    <span> | </span>
                    <a href='/logout'>Logout</a>
                </div>
            }

        </div>
    )
}

export default Header