import React from 'react'
interface Props {
    text: string
}
const ShowTextAreaText: React.FC<Props> = ({ text }) => {
    let desc = text.split('\n');
    return (
        desc.map((item, key) => (
            <div key={key} className='text-[14px]'>
                {item.length === 0 ? <br /> :
                    <p>{item}</p>
                }
            </div>
        ))
    )
}

export default ShowTextAreaText