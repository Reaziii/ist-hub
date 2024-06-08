import NotUpdated from '@/components/NotUpdated';
import React from 'react'
import AboutUpdate from './AboutUpdate';
interface Props{ 
    owner: boolean, 
    about: string, 
    update: (about: string) => Promise<ServerMessageInterface> 
}
const About: React.FC<Props> = ({ about, update, owner }) => {
    let pr = about.split('\n');
    return (
        <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>
            <h1 className='font-bold text-[20px] mb-5'>About</h1>
            {
                about.length ? <>
                    {pr.map((item, key) => (
                        <div key={key} className='text-[14px]'>
                            {item.length === 0 ? <br /> :
                                <p>{item}</p>
                            }
                        </div>
                    ))}
                </> : <NotUpdated />
            }
            {
                owner && <AboutUpdate about={about} update={update} />
            }
        </div>

    )
}

export default About