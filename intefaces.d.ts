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
    verfified: boolean,
    username: string,
    email_verfied: boolean,
    bio: string,
    about: string,
    resume: string
}

interface EducationInterface {
    school: string,
    degree: string,
    grade: number,
    start_date: string,
    end_date: string | null | undefined,
    edu_id?: number,
    still: boolean,
}

interface Profile {
    photo: string,
    bio: string,
    about: string,
    phone: string,
    email: string,
    fullname: string,
    resume: string | null,
    userid: number;
}

interface ExperieneInterfaces {
    exp_id?: number,
    title: string,
    employee_type: EmployeeType,
    positioin: string,
    company_name: string,
    start_date: string,
    end_date?: string | null,
    location: string,
    still: boolean
}

interface SkillInterface {
    userid: number;
    skill: string;
    skill_id: number;
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

interface Showcase {
    showcase_id: number,
    userid: number,
    name: string,
    description: string,
    tags: {
        showcase_id: number,
        tag: string
    }[]
}