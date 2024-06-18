import React from 'react'
import AddAdmin from './AddAdmin'
import { getProfileDetails } from '@/lib/admin/admin'
import { sendAdminInvitationLink } from '@/lib/admin/auth'

const AddAdminPage = () => {
    return (
        <AddAdmin sendAdminInvitationLink={sendAdminInvitationLink} getProfileDetails={getProfileDetails} />
    )
}

export default AddAdminPage