import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import conn from "./mysql";

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

export const extractEmailAddress = async (username: string): Promise<ServerMessageInterface & { email?: string }> => {
    try {
        let details = extractDetails(username);
        console.log(username)
        if (!details) throw "";
        let sql = `select email from user where department = ? and batch = ? and roll_no = ?`
        let data = await conn.query(sql, [details?.department, details?.batch, details?.rollNumber]) as any[];
        if (data.length >= 2) {
            data = data[0] as Array<{ email: string }>;
            if (data.length >= 1)
                return { success: true, msg: "Successfully retrived", email: data[0].email }
        }
    }
    catch (err) {
        console.log(err)
    }

    return { success: false, msg: "Failed to retrive" }
}

export const updateProfilePicture = (form: FormData) => {

}