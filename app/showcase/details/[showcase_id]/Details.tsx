"use client"
import ShowTextAreaText from '@/components/ShowTextAreaText'
import Link from 'next/link'
import React from 'react'

const Details: React.FC<{ details: ShowcaseInterface, userDetails: ProfileInterface, owner: boolean }> = ({ details, userDetails, owner }) => {
    return (
        <div
            className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative min-h-[100px]'

        >
            <h1 className='font-bold text-[20px]'>{details.name}</h1>
            {
                owner && <button className='absolute right-10 top-5 hover:bg-gray-100 h-10 w-10 border rounded-full transition-all'>
                    <Link href={"/showcase/update/step-1?showcase_id=" + details._id} >
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                </button>
            }
            <Link href={"/profile/" + userDetails.username}>{userDetails.fullname}</Link>
            <div className='flex flex-wrap gap-2 mt-[20px]'>
                {
                    details.tags.map((item, key) => (
                        <div key={key} className="py-[5px] px-[10px] border rounded-full">
                            {item.tag}
                        </div>
                    ))
                }
            </div>
            <br />
            <ShowTextAreaText text={details.description} />

        </div>
    )
}

export default Details