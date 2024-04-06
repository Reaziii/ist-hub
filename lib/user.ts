import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

export const user = async (): Promise<{ login: boolean, usr?: { name: string, email: string, photo: string, username: string } }> => {
    let token = cookies().get("token");
    try {
        if (!token) throw "";
        let details = jwt.verify(token.value, process.env.JWTSECRET ?? "ISTHUB") as { name: string, email: string, photo: string, username: string };
        return { login: true, usr: details }
    }
    catch (err) {
        return { login: false }
    }
}

export function extractDetails(input: string): { department: string, batch: number, rollNumber: number } | null {
    const parts = input.split('-');
    if (parts.length === 3) {
        const department = parts[0].toLowerCase();

        const batch = parts[1];
        const rollNumber = parts[2];
        return {
            department,
            batch: parseInt(batch),
            rollNumber: parseInt(rollNumber)
        };
    } else {
        return null;
    }
}


export const updateProfilePicture = (form:FormData)=>{
    
}