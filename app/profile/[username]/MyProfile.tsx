import { user } from '@/lib/user'
import React from 'react'
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import About from './About';
import Education from './Education';
import Experiences from './Experiences';

const MyProfile: React.FC = async () => {
    const usr = await user();
    const about = `
I am currently pursing my B.Sc in computer Science and Engineering from Institute of Science and Technology, Bangladesh.I am currently pursing my B.Sc in computer Science and Engineering from Institute of Science and Technology, Bangladesh.I am currently pursing my B.Sc in computer Science and Engineering from Institute of Science and Technology, Bangladesh.

I have a passion for problem-solving and like to solve challenges that help evolve analytical and programming skills.

🏋️ My profiles on various Competitive coding platforms are :
Codechef: https://www.codechef.com/users/reaziii 
Codeforces: https://codeforces.com/profile/ReCRuS
HackerRank: hackerrank.com/reaziiii 
Leetcode: https://leetcode.com/reaziii/

👉 https://github.com/reaziii
👉 reazahammed.iii@gmail.com
👉 https://reaziii.github.io

🏆 2019 ICPC Dhaka Regional Participant
🏆 2020 MIST NCPC Participant
🏆 2020 ICPC Dhaka Regional Participant
🏆 2021 NASA Space Apps Challenge 1st runners up (Chittagong)
🏆 2022 RUET IUPC Participant
🏆 2022 AUST IUPC Participant
🏆 2022 BUET IUPC Participant
🏆 2022 INTRA IST PROGRAMMING CONTEST Champion
🏆 2021 ICPC Dhaka Regional participant
🏆 2021 ICPC Asia west continent finalist
🏆 2023 SUST IUPC Participant
🏆 2022 ICPC Dhaka Regional participant
🏆 2023 BUET IUPC Participant
🏆 2023 COU-Bracnet IUPC Participant
🏆 2023 SRBD code contest finalist
🏆 2023 ICPC Dhaka Regional participant
🏆 2024 IUPC CUET participant
🏆 2024 UAP Inter University Collaborative Programming Contest 1.0 (Senior)
`
    return (
        <div className='w-full px-[40px] box-border'>
            <div className='border border-[#ccc] mt-[20px] rounded-lg pb-[40px] overflow-hidden bg-white'>
                <div style={{
                    backgroundImage: `url("/black-line.svg")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                }} className='w-full h-[200px]  relative'>
                    <img className='h-[200px] w-[200px] bottom-[-50px] left-[50px] rounded-full absolute' src="http://res.cloudinary.com/dlflltzfi/image/upload/v1697138820/pcist/07d2eede4ff2fa4d5262a55e4ac41e6f_ibx5ix.jpg" alt="" />
                </div>
                <div className='px-[40px]  mt-[60px]'>
                    <div className='flex items-center gap-[20px]'>
                        <h1 className='font-bold text-[24px]'>{usr?.usr?.name}</h1><FaCheckCircle size={20} color='lightgray' />
                    </div>
                    <div className='flex'>
                        <p className='text-[16px] w-[60%]'>
                            CSE @IST'26 || Expart @ Codeforces (1719) || 5🌟 @ Codechef (2025) || ICPC Asia west continent finalist
                        </p>
                        <div className="flex flex-col items-end w-[40%]">
                            <div className='flex items-center gap-[10px]'><p>01533523233</p><span><FaPhoneAlt /></span></div>
                            <div className='flex items-center gap-[10px]'><a className='text-blue-500' href='https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=baphonreaz@gmail.com' target='_blank'>baphonreaz@gmail.com</a><span><MdOutlineAlternateEmail /></span></div>


                        </div>
                    </div>
                </div>
            </div>
            <About about={about} />
            <Education />
            <Experiences/>
        </div>
    )
}

export default MyProfile