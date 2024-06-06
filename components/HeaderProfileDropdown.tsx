"use client"
import Link from 'next/link';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
interface Props{ 
    user: { 
        name: string, 
        email: string, 
        photo: string, 
        username: string 
    } 
}
const HeaderProfileDropdown: React.FC<Props> = ({ user }) => {
    const [open, setOPen] = useState(false);

    return (
        <div className="relative">

            <button onClick={() => setOPen(!open)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" text-gray-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   " type="button">
                {user.name}
                <svg className="w-2.5 h-2.5 ms-3"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <div className={`z-10 ${!open ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link href={`/profile/${user.username}`} className="block px-4 py-2 hover:bg-gray-100  ">Profile</Link>
                    </li>
                    <li>
                        <Link href="/jobs/create" className="block px-4 py-2 hover:bg-gray-100  ">Post a job</Link>
                    </li>
                    <li>
                        <Link href={`/profile/${user.username}/jobs`} className="block px-4 py-2 hover:bg-gray-100  ">My Jobs</Link>
                    </li>
                    <li>
                        <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100  ">Sign out</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default HeaderProfileDropdown