import Header from '@/components/Header';
import React from 'react'
import MyProfile from './MyProfile';
interface Props{ 
    params: { 
        username: string 
    } 
}
const Profile: React.FC<Props> = async ({ params: { username } }) => {
    return (
        <div className='pb-[100px]'>
            <Header />
            <div className='h-[60px] w-full' />
            <MyProfile username={username} />
        </div>
    )
}

export default Profile