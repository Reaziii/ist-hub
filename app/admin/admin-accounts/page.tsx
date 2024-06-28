import React from 'react'
import AccountDashboard from './AccountDashboard'
import { getAdminUsers, getProfileDetails, toggleAdminActive } from '@/lib/admin/admin'

const AdminAccountPage = () => {
  return (
    <AccountDashboard getProfileDetails={getProfileDetails} getAdmins={getAdminUsers} toggleAdminActive={toggleAdminActive}/>
  )
}

export default AdminAccountPage