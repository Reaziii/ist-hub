"use client"
import React, { useEffect, useState } from 'react'
import AdminSideNav from './AdminSideNav'
import { redirect, useRouter } from 'next/navigation';
import ButtonSpinner from './ButtonSpinner';

interface Props {
    children: (admin: { admin: AdminUserInterface, setAdmin: (admin: AdminUserInterface) => void }) => React.ReactElement,
    active: string,
    getProfileDetails: () => Promise<ServerMessageInterface & { admin?: AdminUserInterface }>
}
const AdminDashboard: React.FC<Props> = ({ children: Component, active, getProfileDetails }) => {
    const [admin, setAdmin] = React.useState<AdminUserInterface | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (loading) return;
        setLoading(() => true);
        getProfileDetails().then(resp => {
            if (resp.admin) {
                setAdmin({ ...resp.admin });
            }
            else {
                return router.push("/admin/login")
            }
            setLoading(false);

        })
    }, [])
    return (
        <div>
            <div className='h-[60px] w-full fixed top-0 left-0 pl-[300px] border-box shadow-2 px-10 flex items-center justify-end bg-[white]'>
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className='font-bold'>{admin?.name.length ? admin.name : "Admin"}</h1>
                        <p className='text-gray-600 font-medium text-[12px]'>{admin?.email}</p>
                    </div>
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                        <img
                            className='w-full h-full'
                            src={
                                admin?.photo && admin.photo.length ? admin.photo : "/defaultdp.png"
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <AdminSideNav active={active} />
            <div className='pl-[300px] pt-[60px] w-full min-h-[100vh] bg-[#F1F5F9]'>
                <div className="w-full p-[20px]">
                    {
                        loading || !admin  ?
                            <div className='w-full h-[100vh] flex items-center justify-center'>
                                <ButtonSpinner />
                            </div>
                            :
                            <Component admin={admin} setAdmin={setAdmin} />

                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard