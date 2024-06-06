"use client"
import { getMonthAndYearFromTimestamp } from '@/lib/utils'
import React, { FC, useEffect, useState } from 'react'
import AddEducation from './AddEducation'
import UpdateEducation from './UpdateEducation'
import handleToast from '@/components/handleToast'
import ButtonSpinner from '@/components/ButtonSpinner'
interface Props{
    email: string,
    userid: string,
    owner: boolean,
    update: (params: EducationInterface) => Promise<ServerMessageInterface>,
    getEducations?: (userid: string) => Promise<ServerMessageInterface & { educations?: EducationInterface[] }>,
    addNewEducation: (params: EducationInterface) => Promise<ServerMessageInterface>,
    deleteItem: (id: string) => Promise<ServerMessageInterface>
}
const Education: FC<Props> = ({ email, addNewEducation, getEducations, update, deleteItem, owner, userid }) => {
        let [educations, setEducations] = useState<EducationInterface[]>([])
        const [loading, setLoading] = useState(true);
        let [openUpdateModal, setOpenUpdateModal] = useState<EducationInterface & { open: null | number }>({
            open: null,
            degree: "",
            school: "",
            grade: 0.0,
            start_date: new Date(),
            end_date: new Date(),
            still: false,
            _id: "",
            userid: ""

        });
        let handleUpdate = (id: number) => {
            setOpenUpdateModal({
                ...educations[id],
                open: id
            })
        }

        const handleRetrive = async () => {
            if (!getEducations) return;
            setLoading(true);
            setEducations([])
            let p_education = await getEducations(userid)
            let _educations: EducationInterface[] | undefined = p_education.educations
            if (_educations === undefined) _educations = [];
            setEducations([..._educations])
            setOpenUpdateModal({
                open: null,
                degree: "",
                school: "",
                grade: 0.0,
                start_date: new Date(),
                end_date: new Date(),
                still: false,
                _id: "",
                userid: ""
            })
            setLoading(false);
        }
        useEffect(() => {
            handleRetrive();
        }, []);

        const _handleUpdate = async (params: EducationInterface) => {
            let res = await update(params)
            handleToast(res);
            await handleRetrive();
        }
        const _handleAdd = async (params: EducationInterface) => {
            let res = await addNewEducation(params);
            handleToast(res);
            await handleRetrive();
        }

        const handleDelete = async () => {
            let res = await deleteItem(openUpdateModal._id ?? "");
            handleToast(res);
            await handleRetrive();

        }
        return (
            <div>
                {openUpdateModal.open !== null ? <UpdateEducation update={_handleUpdate} close={() => setOpenUpdateModal({ ...openUpdateModal, open: null })} values={{ ...openUpdateModal }} deleteItem={handleDelete} /> : null}
                <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
                    <h1 className='font-bold text-[20px]'>Education</h1>
                    <div>
                        {
                            loading ? <div className='h-[100px] w-full flex items-center justify-center'>

                                <ButtonSpinner />
                            </div> :
                                educations.map((item, key) => (
                                    <div onClick={() => handleUpdate(key)} key={key} className='mt-[20px] cursor-pointer'>
                                        <h1 className='font-bold'>{item.school}</h1>
                                        <p className='text-[12px]'>{item.degree}</p>
                                        <p className='text-[12px] text-gray-500'>
                                            {getMonthAndYearFromTimestamp(new Date(item.start_date).getTime()).month} {getMonthAndYearFromTimestamp(new Date(item.start_date).getTime()).year} - {" "}
                                            {
                                                item.still ? "ongoing" :
                                                    item.end_date ? <>{getMonthAndYearFromTimestamp(new Date(item.end_date).getTime()).month} {getMonthAndYearFromTimestamp(new Date(item.end_date).getTime()).year}</> : null
                                            }
                                        </p>

                                    </div>
                                ))
                        }
                    </div>
                    {
                        owner ? <AddEducation add={_handleAdd} /> : null
                    }
                </div>
            </div>
        )
    }

export default Education