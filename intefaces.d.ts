interface ServerMessageInterface {
    success: boolean,
    msg: string
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

interface SkillInterface{
    userid : number;
    skill: string;
    skill_id : number;
}