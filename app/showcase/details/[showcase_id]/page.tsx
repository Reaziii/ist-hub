import Header from '@/components/Header';
import { getProfileDetails } from '@/lib/profile';
import { getShowCaseDetails } from '@/lib/showcases';
import React from 'react'
import Details from './Details';
import { user } from '@/lib/user';
interface Props{ 
    params: { showcase_id: string } 
}
const ShowcaseDetails: React.FC<Props> = async ({ params: { showcase_id } }) => {
    const showcase = await getShowCaseDetails(showcase_id)
    if (!showcase.success || !showcase.showcase) {
        return <div>Showcase not found</div>
    }
    const usr = await getProfileDetails(showcase.showcase.userid)
    const iam = await user();
    if (!usr.profile) {
        return <div>User is not valid</div>
    }
    return <div>
        <Header />
        <div className='pt-[80px]' />
        <div className="max-w-screen-xl mx-auto">
            <Details userDetails={usr.profile} details={showcase.showcase} owner={iam.usr?._id === showcase.showcase.userid} />
        </div>
    </div>
}

export default ShowcaseDetails;