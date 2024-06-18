import React from 'react'
import Update from './Update'
import { UploadProfilePicture, getProfileDetails, updateProfile } from '@/lib/admin/admin'

const Page: React.FC = () => {
  
  return (
      <Update getProfileDetails={getProfileDetails} upload={UploadProfilePicture} updateProfile={updateProfile}/>
  )
}




export default Page