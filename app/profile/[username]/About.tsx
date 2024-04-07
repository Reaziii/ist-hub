import React from 'react'

const About: React.FC<{ about: string }> = ({ about }) => {
    let pr = about.split('\n');
    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white'>
            <h1 className='font-bold text-[20px]'>About</h1>
            <>
                {pr.map((item, key) => (
                    <div key={key} className='text-[14px]'>
                        {item.length === 0 ? <br /> :
                            <p>{item}</p>
                        }
                    </div>
                ))}
            </>
        </div>

    )
}

export default About