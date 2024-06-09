interface ServerMessageInterface {
    success: boolean,
    msg: string
}

interface UserInterface {
    fullname: string,
    department: string,
    batch: number,
    roll_no: number,
    phone: string,
    email: string,
    password: string,
    photo: string,
    verified: boolean,
    username: string,
    email_verified: boolean,
    bio: string,
    about: string,
    resume: string,
}

interface EducationInterface {
    school: string,
    degree: string,
    grade: number,
    start_date: Date,
    end_date: Date,
    _id: string,
    still: boolean,
    userid: string
}

interface ProfileInterface {
    photo: string,
    bio: string,
    about: string,
    phone: string,
    email: string,
    fullname: string,
    resume: string | null,
    _id: string,
    owner: boolean,
    username: string,
    verified: boolean
}

interface ExperieneInterfaces {
    _id: string,
    title: string,
    employee_type: EmployeeType,
    position: string,
    company_name: string,
    start_date: Date,
    end_date: Date,
    location: string,
    still: boolean,
    userid: string
}

interface SkillInterface {
    userid: number;
    skill: string;
    _id: string;
}

interface ShowcaseVerifierDetails {
    email: string,
    showcase_id: number,
    verified: boolean,
    name: string,
    company: string,
    mailSent: boolean,
    title: string
}

interface ShowcaseTagInterface {
    showcase_id: string,
    tag: string,
    _id: string
}


interface ShowcaseInterface {
    _id: string,
    userid: string,
    name: string,
    description: string,
    tags: ShowcaseTagInterface[]
}

interface JobTagInterface {
    tag: string,
    _id: string,
    job_id: string
}

interface JobInterface {
    _id: string,
    title: string,
    tags: JobTagInterface[],
    company: string,
    company_email: string,
    website: string,
    address: string,
    description: string,
    type: string,
    userid: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

interface JobInterfaceWithUserData extends JobInterface {
    username: string,
    fullname: string
}

interface ShortUserInterface {
    fullname: string,
    email: string,
    photo: string,
    username: string,
    skills: SkillInterface[],
    _id: string,
    bio: string,
    resume: string,
}

interface UserVerifierInterface {
    verfier: string,
    owner: string,
    verifiedAt: Date
}