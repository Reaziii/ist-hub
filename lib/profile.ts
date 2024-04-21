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

export const getProfileDetails = async (email: string): Promise<ServerMessageInterface & { profile?: Profile }> => {
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

export const addNewEducation = async (params: EducationInterface): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr || !usr.login || !usr.usr) return { success: false, msg: "Unauthorized" }
        let sql = `select userid from user where email = ?`
        let data = await conn.query(sql, [usr.usr.email]) as any[];
        if (data.length >= 2) {
            let userid = data[0][0].userid;
            sql = `insert into education(userid, start_date, end_date, grade, school, degree, still) values(?,?,?,?,?,?, ?)`
            data = await conn.query(sql, [userid, params.start_date, params.end_date, params.grade, params.school, params.degree, params.still])
            return { success: true, msg: "Successfully added" }
        }
    }
    catch (err) {
        console.log("[add new education]", err)
    }



    return { success: false, msg: "Failed to add" }
}


export const getEducations = async (email: string): Promise<ServerMessageInterface & { educations?: EducationInterface[] }> => {
    "use server"
    try {
        let sql = `
            SELECT e.*
            FROM education e
            INNER JOIN user u ON e.userid = u.userid
            WHERE u.email = ?
            ORDER BY e.start_date DESC
            ;
        `
        let data = (await conn.query(sql, [email]))[0] as EducationInterface[];

        return { success: true, msg: "Education retrived", educations: data }


    }
    catch (err) {
        console.log(err);
    }


    return { success: false, msg: "Couldn't retrived educations" }


}

export const updateAnEducation = async (params: EducationInterface): Promise<ServerMessageInterface> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) return { success: false, msg: "Unauthorized" }
        let sql = `select userid from user where email = ?`
        let data = await conn.query(sql, [usr.usr.email]) as any[]
        if (data.length >= 2) {
            let userid = data[0][0].userid;
            sql = `update education set degree = ? , school = ?, start_date= ? , end_date = ?, grade = ?, still = ? where edu_id = ? and userid = ?`;
            await conn.query(sql, [params.degree, params.school, params.start_date, params.end_date, params.grade, params.still, params.edu_id, userid]);
            return { success: true, msg: "Education updated successfully" }
        }
    }
    catch (err) {
        console.log(err)
    }
    return { success: false, msg: "Failed to update!" }

}

export const deleteAnEduItem = async (id: number): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let sql = `delete from education where edu_id = ?`;
        await conn.query(sql, [id])
        return { success: true, msg: "Successfully Deleted" }
    } catch (err) {
        return { success: false, msg: "Failed to delete" }
    }
}

export const addNewExperience = async (params: ExperieneInterfaces): Promise<ServerMessageInterface> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) return { success: false, msg: "Unauthorized" }
        let sql = `select userid from user where email = ?`
        let data = await conn.query(sql, [usr.usr.email]) as any[];
        if (data.length >= 2) {
            let userid = data[0][0].userid;
            sql = `insert into experience(userid, title, employee_type, position, company_name, start_date, end_date, location, still) values(?,?,?,?,?,?,?,?)`;
            data = await conn.query(sql, [userid, params.title, params.employee_type, params.positioin, params.company_name, params.start_date.toString(), params.end_date?.toString(), params.location, params.still])
            return { success: true, msg: "Successfully added" }
        }

    } catch (err) {
        console.log(err);
    }

    return { success: false, msg: "Failed to add new experience" }
}


export const getExperiences = async (email: string): Promise<ServerMessageInterface & { experiences?: ExperieneInterfaces[] }> => {
    "use server"
    try {
        let sql = `
            SELECT e.*
            FROM experience e
            INNER JOIN user u ON e.userid = u.userid
            WHERE u.email = ?
            ORDER BY e.start_date DESC
            ;
        `
        let data = (await conn.query(sql, [email]))[0] as ExperieneInterfaces[];

        return { success: true, msg: "Education retrived", experiences: data }


    }
    catch (err) {
        console.log(err);
    }


    return { success: false, msg: "Couldn't retrived educations" }


}



export const updateAnExperience = async (params: ExperieneInterfaces): Promise<ServerMessageInterface> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) return { success: false, msg: "Unauthorized" }
        let sql = `select userid from user where email = ?`
        let data = await conn.query(sql, [usr.usr.email]) as any[];
        if (data.length >= 2) {
            let userid = data[0][0].userid;
            sql = `update experience set title = ? , employee_type = ?, company_name = ?, start_date = ?, end_date = ?, location = ?, still = ? where userid = ? and exp_id = ?`;
            data = await conn.query(sql, [params.title, params.employee_type, params.company_name, params.start_date.toString(), params.end_date?.toString(), params.location, params.still, userid, params.exp_id])
            return { success: true, msg: "Experience updated succesfully" }
        }
    }
    catch (err) {
        console.log(err)
    }
    return { success: false, msg: "Failed to update!" }

}


export const deleteAnExperienceItem = async (id: number): Promise<ServerMessageInterface> => {
    "use server";
    try {
        let sql = `delete from experience where exp_id = ?`;
        await conn.query(sql, [id])
        return { success: true, msg: "Successfully Deleted" }
    } catch (err) {
        return { success: false, msg: "Failed to delete" }
    }
}

export const uploadResume = async (form: FormData): Promise<ServerMessageInterface> => {
    "use server"
    let file = form.get("file") as File;
    try {
        let usr = await user();
        if (!usr.usr) return { success: false, msg: "Unauthorized" }
        const buffer = Buffer.from(await file.arrayBuffer());
        let _ = await cloudinaryImageUploadMethod(buffer)
        if (!_.success) throw "";
        let sql = 'update user set resume = ? where userid = ?'
        await conn.query(sql, [_.url, usr.usr.userid])
        return { success: true, msg: "Resume uploaded successfully" }


    } catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to upload resume" }
}