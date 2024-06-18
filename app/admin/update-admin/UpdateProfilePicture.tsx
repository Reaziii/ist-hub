"use client"
import ButtonSpinner from '@/components/ButtonSpinner'
import handleToast from '@/components/handleToast'
import React, { useRef, useState } from 'react'
interface Props {
    upload: (form: FormData) => Promise<ServerMessageInterface & { img?: string }>,
    oldPicture: string,
    setProfilePic: (img: string) => void
}
const UpdateProfilePicture: React.FC<Props> = ({ upload, oldPicture, setProfilePic }) => {
    const ref = useRef<HTMLInputElement>(null)
    const [old, setOld] = useState(oldPicture)
    const [loading, setLoading] = useState(false);
    const onSubmit = (img: File) => {
        if (loading) return;
        setLoading(true);
        let form = new FormData();
        form.set("img", img)
        upload(form).then(resp => {
            handleToast(resp)
            if (resp.img) {
                setOld(resp.img)
                setProfilePic(resp.img)
            }
            setLoading(false);
        })
    }
    return (
        <div className="h-[100px] w-[100px] rounded-full overflow-hidden relative border">
            {
                loading && <div className='h-full w-full top-0 left-0 absolute bg-[white] flex justify-center items-center'>
                    <ButtonSpinner />
                </div>
            }
            <img
                className='h-full w-full'
                onClick={() => {
                    ref?.current?.click()
                }} src={
                    old.length === 0 ? '/defaultdp.png' : old
                } />
            <input onChange={(e) => {
                if (e.target.files?.length && e.target.files[0]) {
                    onSubmit(e.target.files[0])
                }
            }} ref={ref} name='img' type="file" hidden />
        </div>
    )
}

export default UpdateProfilePicture