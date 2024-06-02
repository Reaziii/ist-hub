
import { cloudinaryImageUploadMethod } from "./upload";
import { user } from "./user";
import conn from "./mysql";
import { signNewToken } from "./auth";
import { cookies } from 'next/headers'
import { ErrorMessage } from "@/constants";
import sendMail from "./sendmail";
import { formatDate } from "./utils";
import UserModel from "@/models/UserModel";
import EducationModel from "@/models/EducationModel";

export const uploadProfilePicture = async (form: FormData): Promise<ServerMessageInterface & { img?: string }> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
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

export const getProfileDetails = async (userid: string): Promise<ServerMessageInterface & { profile?: ProfileInterface }> => {
    try {
        let usr = await user();
        let _user = await UserModel.findOne({
            _id: userid
        }).lean();
        if (!_user) {
            return { success: false, msg: "User doesn't exists" }
        }
        let profile: ProfileInterface = {
            phone: _user.phone,
            bio: _user.bio,
            about: _user.about,
            photo: _user.photo,
            email: _user.email,
            fullname: _user.fullname,
            resume: _user.resume,
            _id: String(_user._id),
            owner: usr.usr?._id === _user._id,
        };
        return { success: true, msg: "Profile fetched successfully", profile }

    } catch (err) {


    }

    return { success: false, msg: "server error" }
}

export const updateNameAndBio = async (name: string, bio: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) { return { success: false, msg: "User doesn't exists" } }
        _user.fullname = name;
        _user.bio = name;
        await _user.save();
        let token = (await signNewToken(usr.usr.email)).token
        return { success: true, msg: "Profile Updated successfully", token }
    } catch (err) {
        console.log("bio update failed ===> ", err);
        return { success: false, msg: "Failed to update" }
    }
}

export const updateAbout = async (about: string): Promise<ServerMessageInterface & { token?: string }> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) return { success: false, msg: "User doesn't exists" }
        _user.about = about;
        await _user.save();
        let token = (await signNewToken(usr.usr.email)).token
        return { success: true, msg: "About Updated successfully", token }
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update" }
    }
}

export const addNewEducation = async (params: EducationInterface): Promise<ServerMessageInterface> => {
    "use server"
    try {
        if (params.end_date === '') params.end_date = formatDate(new Date())
        let usr = await user();
        if (!usr || !usr.login || !usr.usr) return ErrorMessage.UNAUTHORIZED;
        let education = new EducationModel({
            ...params,
            userid: String(usr.usr._id)
        });
        await education.save();
        return {
            success: true,
            msg: "New education added successfully"
        }
    }
    catch (err) {
        console.log("[add new education]", err)
    }


    return { success: false, msg: "Failed to add Education" }
}


export const getEducations = async (userid: string): Promise<ServerMessageInterface & { educations?: EducationInterface[] }> => {
    "use server"
    try {
        let educations = await EducationModel.find({ userid }).lean();
        return { success: true, msg: "Education retrived", educations: educations }
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
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let education = await EducationModel.findById(params._id);
        if (!education) {
            return { success: false, msg: "Education doesn't exists" }
        }
        education.school = params.school;
        education.degree = params.degree;
        education.grade = params.grade;
        education.still = params.still;
        education.start_date = params.start_date;
        education.end_date = params.end_date;
        await education.save();
        return {
            success: true, msg: "Education updated successfully"
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
        if (params.end_date === '') params.end_date = formatDate(new Date())
        const usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let sql = `select userid from user where email = ?`
        let data = await conn.query(sql, [usr.usr.email]) as any[];
        if (data.length >= 2) {
            let userid = data[0][0].userid;
            sql = `insert into experience(userid, title, employee_type, position, company_name, start_date, end_date, location, still) values(?,?,?,?,?,?,?,?,?)`;
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
        if (params.end_date === '') params.end_date = formatDate(new Date())
        const usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
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
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
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

export const addNewSkill = async (skill: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let sql = `insert into skills(skill, userid) values(?,?)`
        await conn.query(sql, [skill, usr.usr.userid]);
        return { success: true, msg: "Skill added successfully" }
    }
    catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to upload" }
}
export const getSkills = async (userid: number): Promise<ServerMessageInterface & { skills: SkillInterface[] }> => {
    "use server"
    try {
        let sql = `select * from skills where userid = ?`;
        let data = (await conn.query(sql, [userid]))[0] as SkillInterface[];
        return { success: true, msg: "Education retrived", skills: data }

    } catch (err) {

    }
    return { success: false, msg: "Failed to retrive skills", skills: [] }
}
export const deleteASkill = async (skill_id: number): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        let sql = `delete from skills where userid = ? and skill_id = ?`;
        await conn.query(sql, [usr.usr.userid, skill_id])
        return { success: true, msg: "Skill deleted successfully" }

    } catch (err) {
        console.log(err);

    }
    return { success: false, msg: "Failed to delete" }
}



export const addNewShowcase = async (name: string): Promise<ServerMessageInterface & { showcase_id: number }> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized", showcase_id: 0 }
        }
        await conn.query('START TRANSACTION');

        // Insert data into the showcase table
        const insertSql = 'INSERT INTO showcase (name, userid, description) VALUES (?,?,?)';
        await conn.query(insertSql, [name, usr.usr.userid, ""]);

        // Get the last inserted ID
        const res = (await conn.query('SELECT LAST_INSERT_ID() AS lastInsertId')) as any[]
        const lastInsertId = res[0][0].lastInsertId;
        await conn.query('COMMIT');
        return { success: true, msg: "Succesfully created new Shwocase", showcase_id: lastInsertId }
    } catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to create", showcase_id: 1 }

}

export const updateDetailsOfShowcase = async (details: string, showcase_id: number): Promise<ServerMessageInterface> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let sql = `update showcase set description = ? where showcase_id = ?`;
        await conn.query(sql, [details, showcase_id])
        return { success: true, msg: "Details updated succesfully" };
    }
    catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update details" }
    }
}


export const updateTagsOfShowcase = async (tags: string[], showcase_id: number): Promise<ServerMessageInterface> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let sql = 'delete from showcaseTags where showcase_id = ?';
        await conn.query(sql, [showcase_id])
        sql = 'insert into showcaseTags (showcase_id, tag) values(?,?)';

        let items: { showcase_id: number, tag: string }[] = [];
        tags.forEach(item => {
            items.push({
                showcase_id: showcase_id,
                tag: item
            })
        })
        await Promise.all(items.map(item => conn.query(sql, [showcase_id, item.tag])))
        return { success: true, msg: "Tags updated succesfully" }


    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update tags" }

    }
}


export const updateShowcaseVerifier = async (email: string, showcase_id: number) => {
    "use server"
    try {
        let sql = `select * from showcase_verifier_details where email = ? and showcase_id = ?`
        let data = await conn.query(sql, [email, showcase_id]) as any[];
        if (data[0].length === 0) {
            sql = `insert into showcase_verifier_details(email, showcase_id) values(?,?)`;
            await conn.query(sql, [email, showcase_id]);
        }
        return { success: true, msg: "shwocase verifier details updated" }
    } catch (err) {
        return { success: false, msg: "shwocase verifier details updated" }
    }
}


export const sendEmailToVerifier = async (showcase_id: number, email: string) => {
    "use server"
    try {
        let sql = `select * from showcase_verifier_details where email = ? and showcase_id = ?`
        let data = await conn.query(sql, [email, showcase_id]) as any[];
        if (data[0].length === 0) {
            return { success: false, msg: "Doesn't exists" }
        }

        let mail = new sendMail(email, "we have xxx", "hello world");
        await mail.send();
        sql = `update showcase_verifier_details set mailSent = ? where email = ? and showcase_id = ?`
        await conn.query(sql, [email, showcase_id])

        return { success: true, msg: "mail has been sent" }
    } catch (err) {
        return { success: false, msg: "Failed to sent" }

    }
}


export const updateShowcaseVerifierDetails = async (params: ShowcaseVerifierDetails): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let sql = `select * from showcase_verifier_details where email = ? and showcase_id = ?`
        let data = await conn.query(sql, [params.email, params.showcase_id]) as any[];
        if (data[0].length === 0) {
            sql = `insert into showcase_verifier_details(email, showcase_id) values(?,?)`;
            await conn.query(sql, [params.email, params.showcase_id]);
        }

        sql = `update showcase_verifier_details set name = ?, title = ?, company = ?`;
        await conn.query(sql, [params.name, params.title, params.company]);
        return { success: true, msg: "shwocase verifier details updated" }


    } catch (err) {
        return { success: false, msg: "shwocase verifier details updated" }
    }
}

export const updateVerifierEmailsOfShowcase = async (emails: string[], showcase_id: number): Promise<ServerMessageInterface> => {
    "use server"
    try {
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let sql = 'select * from showcase where showcase_id = ? and userid = ?';
        let data = await conn.query(sql, [showcase_id, usr.usr.userid]) as any[];
        if (data[0].length === 0) {
            return { success: false, msg: "unathorized" }
        }
        sql = `delete from showcase_verifier where email = ? and showcase_id = ?`;
        await Promise.all(emails.map((item) => conn.query(sql, [item, showcase_id])))
        sql = 'insert into showcase_verifier(email, showcase_id) values(?,?);'
        await Promise.all(emails.map((item) => conn.query(sql, [item, showcase_id])));
        for (let i = 0; i < emails.length; i++) {
            await updateShowcaseVerifier(emails[i], showcase_id)
            await sendEmailToVerifier(showcase_id, emails[i]);
        }
    } catch (err) {
        console.log(err);
    }



    return { success: false, msg: "Failed to update emails" }
}


export const addNewVerifierEmail = async (email: string, showcase_id: number): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) return { success: false, msg: "unauthorized" }
        let sql = 'select * from showcase where userid = ? and showcase_id = ?';
        let data = await conn.query(sql, [usr.usr.userid, showcase_id]) as any[];
        if (data[0].length === 0) return { success: false, msg: "Unauthorized" };
        sql = `select * from showcase_verfier_details where email = ? and showcase_id = ?`;
        data = await conn.query(sql, [email, showcase_id]) as any[];
        if (data[0].length > 0) return { success: false, msg: "Email already exists" };
        sql = 'insert into showcase_verfier_details(email, showcase_id, verified, name, title, company, mailSent) values (?,?,?,?,?,?,?)';
        await conn.query(sql, [email, showcase_id, false, "", "", "", false]);
        return { success: true, msg: "Verifier added succesfully" }
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to add verifier" }
    }


}

export const removeVerifierEmail = async (email: string, showcase_id: number): Promise<ServerMessageInterface> => {
    "use server"
    try {
        let usr = await user();
        if (!usr.usr) return { success: false, msg: "unauthorized" }
        let sql = 'select * from showcase where userid = ? and showcase_id = ?';
        let data = await conn.query(sql, [usr.usr.userid, showcase_id]) as any[];
        if (data[0].length === 0) return { success: false, msg: "Unauthorized" };

        sql = 'delete from showcase_verfier_details where email = ? and showcase_id = ?';
        await conn.query(sql, [email, showcase_id]);
        return { success: true, msg: "Verifier deleted succesfully" }
    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to delete" }
    }
}