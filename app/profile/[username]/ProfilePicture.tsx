"use client"
import ButtonSpinner from '@/components/ButtonSpinner';
import handleToast from '@/components/handleToast';
import React, { useRef, useState } from 'react'

const ProfilePicture: React.FC<{ dp: string, owner: boolean, uploadImage: (form: FormData) => Promise<ServerMessageInterface & { img?: string }> }> = ({ dp, uploadImage, owner }) => {
  const [picture, setPicture] = useState(dp);
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null);
  const handleChange = async (file: File) => {
    if (loading === true) return;
    setLoading(true);
    let form = new FormData();
    form.append("file", file)
    uploadImage(form).then((res) => {
      handleToast(res);
      setLoading(false);
      if (res.img) {
        setPicture(res.img)
      }

    })
  }
  return (
    <div onClick={() => {
      fileRef.current?.click();
    }} className='h-[200px] w-[200px] bottom-[-50px] left-[50px] rounded-full absolute overflow-hidden flex justify-center items-center bg-white'>
      {
        loading ? <ButtonSpinner /> :
          <img loading='lazy' className='m-h-full m-w-full min-h-full min-w-full' src={picture} alt="" />
      }
      {
        owner && <>
          <div className='h-full w-full absolute bg-[#00000098] z-5 opacity-0 hover:opacity-100 transition-all flex justify-center items-center cursor-pointer rounded-full'>
            <p className='text-white uppercase font-bold cursor-pointer'>Change</p>
          </div>
          <input ref={fileRef} type='file' hidden onChange={e => {
            if (e.target.files?.length && e.target.files[0])
              handleChange(e.target.files[0])
          }} />
        </>
      }
    </div>
  )
}

export default ProfilePicture