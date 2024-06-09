import Header from '@/components/Header'
import React from 'react'
import Search from './Search'
import { searchProfile } from '@/lib/profile'
import ShowSearchItem from './ShowSearchItem'
const Page = () => {
    return (
        <div>
            <Header />
            <div className='pt-[60px]' />
            <div className="max-w-screen-xl mx-auto pb-10">
                <Search />
                <ShowSearchItem searchProfile={searchProfile} />
            </div>
        </div>
    )
}

export default Page