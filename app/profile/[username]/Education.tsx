import { getMonthAndDateFromTimestamp, getMonthAndYearFromTimestamp } from '@/lib/utils'
import React from 'react'

const Education = () => {
    const educations = [
        {
            start_date: new Date().getTime(),
            end_date: null,
            grade: 5.5,
            degree: "BSc in Computer Science and Engineering",
            school: "Institute of Science and Technology"
        },
        {
            start_date: new Date().getTime(),
            end_date: new Date().getTime(),
            grade: 5.5,
            degree: "Higher School Certificate",
            school: "Khagrachari Cantonment Public School and College"
        },
        {
            start_date: new Date().getTime(),
            end_date: new Date().getTime(),
            grade: 5.5,
            degree: "Secondary School Certificate",
            school: "Khagrachari Cantonment Public School and College"
        }
    ]
    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white'>
            <h1 className='font-bold text-[20px]'>Education</h1>
            <div>
                {
                    educations.map((item, key) => (
                        <div key={key} className='mt-[20px]'>
                            <h1 className='font-bold'>{item.school}</h1>
                            <p className='text-[12px]'>{item.degree}</p>
                            <p className='text-[12px] text-gray-500'>
                                {getMonthAndYearFromTimestamp(item.start_date).month} {getMonthAndYearFromTimestamp(item.start_date).year} - {" "}
                                {
                                    item.end_date === null ? "ongoing" :
                                        <>{getMonthAndYearFromTimestamp(item.end_date).month} {getMonthAndYearFromTimestamp(item.end_date).year}</>
                                }
                            </p>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Education