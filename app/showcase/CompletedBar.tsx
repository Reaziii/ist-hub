import React, { FC } from 'react'

const CompletedBar: FC<{ done: number }> = ({ done }) => {
    return (
        <div className="absolute w-[600px] top-20 flex items-center">
            {
                (new Array(done).fill(
                    <div className="h-[10px] w-[20%] bg-blue-500 rounded-full" />
                )).map(item => item)
            }
            {
                (new Array(5 - done).fill(<div className="h-[10px] w-[20%] bg-gray-500 rounded-full" />).map(item => item))
            }

        </div>
    )
}

export default CompletedBar