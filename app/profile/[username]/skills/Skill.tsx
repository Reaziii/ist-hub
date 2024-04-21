"use client"
import ButtonSpinner from '@/components/ButtonSpinner';
import React, { FC, useEffect, useState } from 'react'
import AddSkill from './AddSkill';
import handleToast from '@/components/handleToast';

const Skill: FC<{ add: (skill: string) => Promise<ServerMessageInterface>, getSkills: () => Promise<ServerMessageInterface & { skills: SkillInterface[] }>, deleteItem: (skill_id: number) => Promise<ServerMessageInterface> }> = ({ add, getSkills, deleteItem }) => {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState<SkillInterface[]>([])
    const handleRetrive = () => {
        setSkills([]);
        setLoading(true);
        getSkills().then((res) => {
            setSkills([...res.skills])
            setLoading(false);
        })
    }
    useEffect(() => {
        handleRetrive();
    }, [])
    return (
        <div>
            <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>

                <h1 className='font-bold text-[20px]'>Skills</h1>
                <div>
                    {
                        loading ? <div className='h-[100px] w-full flex items-center justify-center'>

                            <ButtonSpinner />
                        </div> :
                            <div className='mt-6'>
                                {
                                    skills.map((item, key) => (
                                        <div key={key} className="border-b pb-2 mb-2 flex justify-between items-center">
                                            <p>{item.skill}</p>
                                            <button
                                                onClick={() => {
                                                    deleteItem(item.skill_id).then(res => {
                                                        handleToast(res);
                                                        handleRetrive();
                                                    })
                                                }}
                                            >
                                                <i className="fa fa-trash text-red-600" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
                <AddSkill add={add} handleRetrive={handleRetrive} />
            </div>
        </div>
    )
}

export default Skill