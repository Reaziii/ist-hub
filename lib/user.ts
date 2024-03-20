import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

export const user = async (): Promise<{ login: boolean, usr?: { name: string, email: string, photo: string } }> => {
    let token = cookies().get("token");
    try {
        if (!token) throw "";
        let details = jwt.verify(token.value, process.env.JWTSECRET ?? "ISTHUB") as { name: string, email: string, photo: string };
        return { login: true, usr: details }
    }
    catch (err) {
        return { login: false }
    }
}