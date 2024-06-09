import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import UserModel from "@/models/UserModel";
import MongoConn from "./mongodb";
import { ErrorMessage } from "@/constants";
import UserVerifier from "@/models/UserVerifier";

export const user = async (): Promise<{ login: boolean, usr?: { name: string, email: string, photo: string, username: string, _id: string, verified: boolean } }> => {
    let token = cookies().get("token");

    try {
        if (!token) throw "";
        let details = jwt.verify(token.value, process.env.JWTSECRET ?? "ISTHUB") as { name: string, email: string, photo: string, username: string, _id: string };
        await MongoConn();
        let _details = await UserModel.findById(details._id).lean();
        if (!_details) throw "";
        return {
            login: true, usr: {
                name: _details.fullname,
                email: _details.email,
                photo: _details.photo,
                username: _details.username,
                _id: details._id,
                verified: _details.verified

            }
        }
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

export const verifyUser = async (userid: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED
        }
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) {
            return ErrorMessage.UNAUTHORIZED
        }
        if (!_user.verified) {
            return { success: false, msg: "You are not allowed to verify an user" }
        }
        _user = await UserModel.findById(userid);
        if (!_user) {
            return { success: false, msg: "User not found" }
        }
        _user.verified = true;
        await _user.save();
        let verifier = new UserVerifier({
            owner: userid,
            verifiedAt: new Date(),
            verfier: usr.usr._id
        })
        await verifier.save();
        return { success: true, msg: "Thanks for verifying the user!" }

    } catch (err) {
        console.log("verify user failed ===> \n", err)
    }

    return {
        success: false, msg: "Failed to verify",
    }
}