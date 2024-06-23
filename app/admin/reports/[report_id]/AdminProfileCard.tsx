import React, { FC } from 'react'
import BorderWrapper from '@/components/BorderWrapper'
const AdminProfileCard: FC<{ admin: AdminUserInterface, title : string }> = ({ admin, title }) => {
    return (
        <BorderWrapper>
            <div>
                <h1 className='font-bold text-[20px]'>{title}</h1>
                <div className="h-[60px] w-[60px] rounded-full overflow-hidden mt-4">
                    <img src={(admin.phone.length > 0 ? admin.photo : "/defaultdp.png")} />
                </div>
                <h1 className="font-bold mt-2">{admin.name}</h1>
                <p>{admin.email}</p>
                <p>{admin.phone}</p>

            </div>
        </BorderWrapper>
    )
}

export default AdminProfileCard