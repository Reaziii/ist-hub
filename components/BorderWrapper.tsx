import React, { FC, ReactNode } from 'react'
interface Props {
    children: ReactNode
}
const BorderWrapper: FC<Props> = ({ children }) => {
    return (
        <div className='border mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
            {children}
        </div>
    )
}

export default BorderWrapper