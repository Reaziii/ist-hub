"use client"
import ButtonSpinner from '@/components/ButtonSpinner';
import React, { FC, useEffect, useState } from 'react'
import AddShowcase from './AddShowcase';
import { truncateString } from '@/utilities/string';
import { useRouter } from 'next/navigation';

interface ShowcaseProps {
    getProfileShowcase: (userid: string) => Promise<ServerMessageInterface & { showcases: ShowcaseInterface[] }>,
    userid: string
}


const Showcase: FC<ShowcaseProps> = ({ getProfileShowcase, userid }) => {
    const [loading, setLoading] = useState(false);
    let [showcases, setShowcases] = useState<ShowcaseInterface[]>([])
    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        getProfileShowcase(userid).then((res) => {
            setShowcases([...res.showcases])
            setLoading(false);
        })
    }, [])
    return (
        <div>
            <div className='border border-[#ccc] mt-[20px] rounded-lg p-[40px] overflow-hidden bg-white relative'>

                <h1 className='font-bold text-[20px]'>Showcase</h1>
                <div>
                    {
                        loading ? <div className='h-[100px] w-full flex items-center justify-center'>
                            <ButtonSpinner />
                        </div> :
                            <div className='mt-6'>
                                {
                                    showcases.map((item, key) => (
                                        <div onClick={() => {
                                            router.push("/showcase/details/" + item._id)


                                        }} className="mb-[40px] cursor-pointer" key={key}>
                                            <h1 className="font-bold">{item.name}</h1>
                                            <p>{truncateString(item.description ?? "", 100)}</p>
                                            <div className="w-full flex flex-wrap gap-[10px] mt-[10px]">
                                                {
                                                    item.tags.map((item, key) => (
                                                        <div key={key} className="py-[5px] px-[10px] border rounded-full">
                                                            {item.tag}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
                <AddShowcase />
            </div>
        </div>
    )
}

export default Showcase