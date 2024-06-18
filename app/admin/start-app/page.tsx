import Header from '@/components/Header'
import React from 'react'
import StartApp from './StartApp'
import { createAdminSendLink } from '@/lib/admin/auth'

export default () => {
    return <div>
        <Header />
        <div className='pt-[60px]' />
        <StartApp createAdminSendLink={createAdminSendLink} />
    </div>
}