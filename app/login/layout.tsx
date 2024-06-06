import Header from '@/components/Header'
import React from 'react'
interface Props{ 
    children: React.ReactNode 
}
const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout