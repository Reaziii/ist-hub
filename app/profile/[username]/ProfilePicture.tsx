"use client"
import ButtonSpinner from '@/components/ButtonSpinner';
import handleToast from '@/components/handleToast';
import React, { useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify';

const ProfilePicture: React.FC<{ dp: string, uploadImage: (form: FormData) => Promise<ServerMessageInterface & { img?: string }> }> = ({ dp, uploadImage }) => {
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
  console.log(dp)
  return (
    <div onClick={() => {
      fileRef.current?.click();
    }} className='h-[200px] w-[200px] bottom-[-50px] left-[50px] rounded-full absolute overflow-hidden flex justify-center items-center bg-white'>
      {
        loading ? <ButtonSpinner /> :
          <img className='m-h-full m-w-full min-h-full min-w-full' src={picture} alt="" />
      }
      {/* <div className='h-full w-full absolute bg-white z-10 flex justify-center items-center'>
        <p className='text-black'>Change</p>
      </div> */}
      <input ref={fileRef} type='file' hidden onChange={e => {
        if (e.target.files?.length && e.target.files[0])
          handleChange(e.target.files[0])
      }} />



      <ToastContainer />
    </div>
  )
}

export default ProfilePicture