"use client"
import { getMonthAndYearFromTimestamp } from '@/lib/utils'
import React, { FC, useEffect, useState } from 'react'
import handleToast from '@/components/handleToast'
import ButtonSpinner from '@/components/ButtonSpinner'
import { EmployeeType } from '@/constants'
import AddExperience from './AddExperience'
import UpdateExperience from './UpdateExperience'
const Experience: FC<
    {
        email: string,
        owner: boolean,
        update: (params: ExperieneInterfaces) => Promise<ServerMessageInterface>,
        getExperinces: (email: string) => Promise<ServerMessageInterface & { experiences?: ExperieneInterfaces[] }>,
        addNewExperience: (params: ExperieneInterfaces) => Promise<ServerMessageInterface>,
        deleteItem: (id: number) => Promise<ServerMessageInterface>
    }> = ({ email, getExperinces, addNewExperience, update, deleteItem, owner }) => {
        let [experiences, setExperiences] = useState<ExperieneInterfaces[]>([])
        const [loading, setLoading] = useState(true);
        let [openUpdateModal, setOpenUpdateModal] = useState<ExperieneInterfaces & { open: null | number }>({
            open: null,
            start_date: new Date().toString(),
            end_date: null,
            employee_type: EmployeeType.FULL_TIME,
            positioin: "",
            location: "",
            title: "",
            company_name: "",
            still: false,

        });
        let handleUpdate = (id: number) => {
            setOpenUpdateModal({
                ...experiences[id],
                open: id
            })
        }

        const handleRetrive = async () => {
            if (!getExperinces) return;
            setLoading(true);
            setExperiences([])
            let p_education = await getExperinces(email)
            let _experiences: ExperieneInterfaces[] | undefined = p_education.experiences
            if (_experiences === undefined) _experiences = [];
            setExperiences([..._experiences])
            setOpenUpdateModal({
                open: null,
                start_date: new Date().toString(),
                end_date: null,
                employee_type: EmployeeType.FULL_TIME,
                positioin: "",
                location: "",
                title: "",
                company_name: "",
                still: false
            })
            setLoading(false);
        }
        useEffect(() => {
            handleRetrive();
        }, []);

        const _handleUpdate = async (params: ExperieneInterfaces) => {
            let res = await update(params)
            handleToast(res);
            await handleRetrive();
        }
        const _handleAdd = async (params: ExperieneInterfaces) => {
            params.exp_id = openUpdateModal.exp_id
            let res = await addNewExperience(params);
            handleToast(res);
            await handleRetrive();
        }

        const handleDelete = async () => {
            let res = await deleteItem(openUpdateModal.exp_id ?? 1000000);
            handleToast(res);
            await handleRetrive();

        }
        return (
            <div>
                <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
                    {openUpdateModal.open !== null ? <UpdateExperience update={_handleUpdate} close={() => setOpenUpdateModal({ ...openUpdateModal, open: null })} values={{ ...openUpdateModal }} deleteItem={handleDelete} /> : null}

                    <h1 className='font-bold text-[20px]'>Experience</h1>
                    <div>
                        {
                            loading ? <div className='h-[100px] w-full flex items-center justify-center'>

                                <ButtonSpinner />
                            </div> :
                                experiences.map((item, key) => (
                                    <div onClick={() => handleUpdate(key)} key={key} className='mt-[20px] cursor-pointer'>
                                        <h1 className='font-bold'>{item.company_name}</h1>
                                        <p className='text-[14px]'>{item.title}</p>
                                        <p className='text-[12px]'>{item.positioin}</p>
                                        <p className='text-[12px] text-gray-500'>
                                            {getMonthAndYearFromTimestamp(new Date(item.start_date).getTime()).month} {getMonthAndYearFromTimestamp(new Date(item.start_date).getTime()).year} - {" "}
                                            {
                                                item.still ? "ongoing" :
                                                    item.end_date ? <>{getMonthAndYearFromTimestamp(new Date(item.end_date).getTime()).month} {getMonthAndYearFromTimestamp(new Date(item.end_date).getTime()).year}</> : null
                                            }
                                        </p>
                                        <p className='text-[12px]'>{item.employee_type}</p>

                                    </div>
                                ))
                        }
                    </div>
                    {
                        owner ? <AddExperience add={_handleAdd} /> : null
                    }
                </div>
            </div>
        )
    }

export default Experience