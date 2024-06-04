import React, { FC } from 'react'

const CompletedBar: FC<{ done: number }> = ({ done }) => {
    return (
        <div className="absolute w-[500px] top-24 flex items-center">
            {
                new Array(done).fill(null).map((item, key) => (
                    <div key={key} className="h-[10px] w-[25%] bg-blue-500 rounded-full" />
                ))
            }
            {
                new Array(3 - done).fill(null).map((item, key) => (
                    <div key={key} className="h-[10px] w-[25%] bg-gray-400 rounded-full" />
                ))
            }

        </div>
    )
}

export default CompletedBar