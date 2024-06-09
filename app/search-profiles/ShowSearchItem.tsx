"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface Props {
    searchProfile: (skills: string[]) => Promise<ServerMessageInterface & { users: ShortUserInterface[] }>
}

const ShowSearchItem: React.FC<Props> = ({ searchProfile }) => {
    let params = useSearchParams();
    let _skills: string | null = params.get("skills")
    let [users, setUsers] = useState<ShortUserInterface[]>([])
    let [skills, setSkills] = useState<string[]>([])
    useEffect(() => {
        if (_skills)
            setSkills(_skills.split(','))
    }, [_skills])
    useEffect(() => {
        if (_skills)
            searchProfile(skills).then(resp => {
                setUsers([...resp.users])
            })
    }, [skills])
    return (
        <>
            {
                users.map((item, key) => (
                    <div key={key} className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
                        <a className='font-bold' target='_blank' href={`/profile/${item.username}`}>{item.fullname}</a>
                        <p>{item.bio}</p>
                        {
                            item.skills.length > 0 && <div className='flex flex-wrap gap-2 my-2'>
                                {
                                    item.skills.map((item, key) => (<p key={key}

                                        style={{
                                            borderColor: skills.map(item => item.toLowerCase()).includes(item.skill.toLowerCase()) ? "green" : undefined,
                                            color: skills.map(item => item.toLowerCase()).includes(item.skill.toLowerCase()) ? "green" : undefined
                                        }}
                                        className='border w-auto px-3 h-[30px] flex items-center rounded-full bg-gray-200 border-gray-300'
                                    >{item.skill}
                                    </p>))
                                }
                            </div>
                        }

                        <a target='_blank' href={`mailto:${item.email}`}>{item.email}</a>
                        <br />
                        {
                            item.resume.length > 0 && <a target='_blank' href={item.resume}>RESUME</a>
                        }
                    </div>))
            }

        </>
    )
}

export default ShowSearchItem