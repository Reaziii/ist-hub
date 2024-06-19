import React from 'react'
import ButtonSpinner from './ButtonSpinner'

const FullPageLoader: React.FC<{ loading: boolean }> = ({ loading }) => {
    if (!loading) return <></>
    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <ButtonSpinner />
        </div>
    )
}

export default FullPageLoader