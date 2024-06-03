import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import conn from "./mysql";
import UserModel from "@/models/UserModel";
import MongoConn from "./mongodb";

export const user = async (): Promise<{ login: boolean, usr?: { name: string, email: string, photo: string, username: string, _id: string } }> => {
    let token = cookies().get("token");
    try {
        if (!token) throw "";
        let details = jwt.verify(token.value, process.env.JWTSECRET ?? "ISTHUB") as { name: string, email: string, photo: string, username: string, _id: string };
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

export const extractEmailAddressAndId = async (username: string): Promise<ServerMessageInterface & { email?: string, _id?: string }> => {
    try {
        await MongoConn();
        let details = extractDetails(username);
        if (!details) throw "";
        let user = await UserModel.findOne({
            username
        })
        if (!user) {
            return { success: false, msg: "User not found" }
        }
        return { success: true, msg: "Email and id retrived", email: user.email, _id: String(user._id) }
    }
    catch (err) {
        console.log(err)
    }

    return { success: false, msg: "Failed to retrive" }
}

export const updateProfilePicture = (form: FormData) => {

}