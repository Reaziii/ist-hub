import React, { FC } from 'react'
interface Props{ 
    done: number 
}
const CompletedBar: FC<Props> = ({ done }) => {
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