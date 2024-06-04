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
    email_verfied: boolean,
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
    userid : string
}

interface ProfileInterface {
    photo: string,
    bio: string,
    about: string,
    phone: string,
    email: string,
    fullname: string,
    resume: string | null,
    _id : string,
    owner : boolean
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
    showcase_id : string,
    tag : string
}


interface ShowcaseInterface {
    _id: string,
    userid: string,
    name: string,
    description: string,
    tags: ShowcaseTag[]
}