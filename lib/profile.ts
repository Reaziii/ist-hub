import { writeFile } from "fs";
import { cloudinaryImageUploadMethod } from "./upload";
import path from "path";
import { user } from "./user";
import sql from 'mysql2'
import conn from "./mysql";
import { signNewToken } from "./auth";
import { cookies } from 'next/headers'
const SaveFile = async (filename: string, buffer: Buffer): Promise<{ success: boolean, url?: string }> => {
    return new Promise((resolve, reject) => {
        try {
            writeFile(
                path.join(process.cwd(), "public/profilepictures/" + filename),
                buffer,
                (err) => {
                    console.log(err)
                    if (err) reject({ success: false, msg: "failed to save" })
                    resolve({ success: true, url: "/profilepictures/" + filename })
                }
            );
        } catch (err) {
            reject()
        }
    })
}

export const uploadProfilePicture = async (form: FormData): Promise<ServerMessageInterface & { img?: string }> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "Unauthorzied" }
        }
        const file = form.get("file") as File;
        if (!file) {
            return { success: false, msg: "File is required" }
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        try {
            let data = await cloudinaryImageUploadMethod(buffer)
            if (data.success && data.url) {
                let sql = `update user set photo = ? where email = ?`
                await conn.query(sql, [data.url, usr.usr.email])
                return ({ msg: "profile picture changed!", success: true, img: data.url });
            }
            throw ""
        } catch (error) {
            console.log(error)
            return ({ msg: "failed to upload profile picture", success: false });
        }
    } catch (err) {
        console.log(err)
        return ({ msg: "failed to upload profile picture", success: false });
    }
}

export const getProfileDetails = async (email:string): Promise<ServerMessageInterface & { profile?: Profile }> => {
    try {

        let sql = `select * from user where email = ?`
        let data = await conn.query(sql, [email]);
        if (data.length) {
            let d = data[0] as Profile[];
            if (d.length) {
                let profile: Profile = d[0];
                return { success: true, msg: "Profile retrived", profile }
            }
        }

    } catch (err) {


    }

    return { success: false, msg: "server error" }
}

export const updateNameAndBio = async (name: string, bio: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "Unauthorized" }
        }
        let sql = `update user set fullname = ? , bio = ? where email = ?`;
        await conn.query(sql, [name, bio, usr.usr?.email]);
        let token = (await signNewToken()).token
        cookies().set("token", token as string)
        return { success: true, msg: "Profile Updated successfully", token }
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update" }
    }
}

export const updateAbout = async (about: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "Unauthorized" }
        }
        let sql = `update user set about = ? where email = ?`;
        await conn.query(sql, [about, usr.usr.email]);
        let token = (await signNewToken()).token
        cookies().set("token", token as string)
        return { success: true, msg: "About Updated successfully", token }
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update" }
    }
}