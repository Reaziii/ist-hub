import Header from '@/components/Header';
import { extractDetails } from '@/lib/user'
import { redirect } from 'next/navigation';
import React from 'react'
import MyProfile from './MyProfile';
import Education from './Education';
const Profile: React.FC<{ params: { username: string } }> = ({ params }) => {
    const user = extractDetails("CSE-26-19057");
    if (user === null) {
        redirect("/")
    }
    return (
        <div className='pb-[100px]'>
            <Header />
            <div className='h-[60px] w-full' />
            <MyProfile />
            
        </div>
    )
}

export default Profile