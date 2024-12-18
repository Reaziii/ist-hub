export enum EmployeeType {
    PART_TIME = 'Part-time',
    FULL_TIME = 'Full-time',
    SELF_EMPLOYED = 'self-employed',
    INTERNSHIP = 'Internship',
    FREELANCE = 'Freelance'
}

export const ErrorMessage = {
    UNAUTHORIZED: { success: false, msg: "Please sign in to get this feature" }
}

export enum ReportStatusType {
    PENDING  = 1,
    RESOLVED = 2,
    CANCELED = 3
}