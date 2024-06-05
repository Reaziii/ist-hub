import { extractEmailAddressAndId, user } from '@/lib/user'
import React from 'react'
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import About from './About';
import Education from './Education/Education';
import ProfilePicture from './ProfilePicture';
import { getProfileDetails, updateAbout, updateNameAndBio, uploadProfilePicture, uploadResume } from '@/lib/profile';
import * as EducationAPI from '@/lib/education'
import MainProfileEdit from './MainProfileEdit';
import { redirect } from 'next/navigation';
import Resume from './Resume';
import * as SkillAPI from '@/lib/skills'
import * as ExperienceAPI from '@/lib/experience'
import Experience from './Experience/Experience';
import Skill from './skills/Skill';
import Showcase from './showcase/Showcase';
import { getProfileShowcases } from '@/lib/showcases'

interface Props {
    username: string
}


const MyProfile: React.FC<Props> = async ({ username }) => {
    let usr = await user();
    let details = await extractEmailAddressAndId(username)
    if (!details.email || !details._id) {
        return redirect("/")
    }
    const profile = await getProfileDetails(details._id);
    if (!profile.profile) {
        return redirect("/")
    }

    const about = `${profile.profile.about ?? ""}`
    const owner = usr.usr?.email !== null && usr.usr?.email === details.email;
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className='w-full px-[40px] box-border'>
                <div className='border border-[#ccc] mt-[20px] pb-[40px] overflow-hidden bg-white rounded-lg shadow'>
                    <div style={{
                        backgroundImage: `url("/black-line.svg")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: "no-repeat",
                    }} className='w-full h-[200px]  relative z-5'>
                        <Resume owner={owner} resume={profile.profile.resume} upload={uploadResume} />
                        <ProfilePicture owner={owner} uploadImage={uploadProfilePicture} dp={profile.profile?.photo ?? ""} />
                    </div>
                    <div className='px-[40px]  pt-[60px] relative'>
                        <div className='flex items-center gap-[20px]'>
                            <h1 className='font-bold text-[24px]'>{profile.profile.fullname}</h1><FaCheckCircle size={20} color='lightgray' />
                        </div>
                        <div className='flex'>
                            <p className='text-[16px] w-[60%] flex flex-col'>
                                {profile.profile?.bio ?? ""}
                            </p>
                            <div className="flex flex-col items-end w-[40%]">
                                <div className='flex items-center gap-[10px]'><p>{profile.profile?.phone ?? ""}</p><span><FaPhoneAlt /></span></div>
                                <div className='flex items-center gap-[10px]'><a className='text-blue-500' href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${profile.profile.email ?? ""}`} target='_blank'>{profile.profile.email ?? ""}</a><span><MdOutlineAlternateEmail /></span></div>
                            </div>
                        </div>
                        {
                            owner &&
                            <MainProfileEdit params={{ name: profile.profile?.fullname, bio: profile.profile?.bio }} update={updateNameAndBio} />
                        }
                    </div>
                </div>
                <About owner={owner} about={about} update={updateAbout} />
                <Education
                    owner={owner}
                    deleteItem={EducationAPI.deleteAnEduItem}
                    update={EducationAPI.updateAnEducation}
                    addNewEducation={EducationAPI.addNewEducation}
                    getEducations={EducationAPI.getEducations}
                    email={profile.profile.email}
                    userid={profile.profile._id} />
                <Experience
                    owner={owner}
                    deleteItem={ExperienceAPI.deleteAnExperienceItem}
                    getExperinces={ExperienceAPI.getExperiences}
                    userid={profile.profile._id}
                    addNewExperience={ExperienceAPI.addNewExperience}
                    update={ExperienceAPI.updateAnExperience} />
                <Skill
                    add={SkillAPI.addNewSkill}
                    getSkills={SkillAPI.getSkills}
                    deleteItem={SkillAPI.deleteASkill}
                    userid={profile.profile._id} />
                <Showcase
                    userid={profile.profile._id}
                    getProfileShowcase={getProfileShowcases} />
            </div>
        </div>
    )
}


export default MyProfile