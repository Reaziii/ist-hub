
import { cloudinaryImageUploadMethod } from "./upload";
import { user } from "./user";
import { signNewToken } from "./auth";
import { ErrorMessage } from "@/constants";
import UserModel from "@/models/UserModel";
import EducationModel from "@/models/EducationModel";
import ExperienceModel from "@/models/ExperienceModel";
import ShowcaseModel from "@/models/ShowcaseModel";
import ShowcaseTagModel from "@/models/ShowcaseTagModel";
import MongoConn from "./mongodb";

export const uploadProfilePicture = async (form: FormData): Promise<ServerMessageInterface & { img?: string }> => {
    "use server"
    try {
        await MongoConn();
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
                let _user = await UserModel.findById(usr.usr._id);
                if (!_user) return ErrorMessage.UNAUTHORIZED;
                _user.photo = data.url;
                await _user.save();
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
        await MongoConn();

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
        await MongoConn();

        let usr = await user();
        if (!usr.usr) {
            return ErrorMessage.UNAUTHORIZED;
        }
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) { return { success: false, msg: "User doesn't exists" } }
        _user.fullname = name;
        _user.bio = bio;
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
        await MongoConn();

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


export const uploadResume = async (form: FormData): Promise<ServerMessageInterface> => {
    "use server"
    let file = form.get("file") as File;
    try {
        await MongoConn();
        let usr = await user();
        if (!usr.usr) return ErrorMessage.UNAUTHORIZED;
        const buffer = Buffer.from(await file.arrayBuffer());
        let _ = await cloudinaryImageUploadMethod(buffer)
        if (!_.success) throw "";
        let _user = await UserModel.findById(usr.usr._id);
        if (!_user) {
            return { success: false, msg: "You are not authorized" }
        }
        _user.resume = _.url ?? "";
        await _user.save();
        return { success: true, msg: "Resume uploaded successfully" }


    } catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to upload resume" }
}




export const addNewShowcase = async (name: string): Promise<ServerMessageInterface & { showcase_id?: string }> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let newShowcase = new ShowcaseModel({
            userid: usr.usr._id,
            name: name
        })
        await newShowcase.save();
        return { success: true, msg: "Succesfully created new Shwocase", showcase_id: String(newShowcase._id) }
    } catch (err) {
        console.log(err);
    }
    return { success: false, msg: "Failed to create" }

}

export const updateDetailsOfShowcase = async (details: string, _id: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) { return ErrorMessage.UNAUTHORIZED }
        let showcase = await ShowcaseModel.findOne({
            _id,
            userid: usr.usr._id
        })
        if (!showcase) {
            return { success: false, msg: "Showcase not found" }
        }
        showcase.description = details;
        await showcase.save();
        return { success: true, msg: "Details updated succesfully" };
    }
    catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update details" }
    }
}


export const updateTagsOfShowcase = async (tags: string[], _id: string): Promise<ServerMessageInterface> => {
    "use server"
    try {
        await MongoConn();
        const usr = await user();
        if (!usr.usr) {
            return { success: false, msg: "unauthorized" }
        }
        let showcase = await ShowcaseModel.findOne({
            userid: usr.usr._id,
            _id
        }).lean().select("_id")
        if (!showcase) {
            return ErrorMessage.UNAUTHORIZED;
        }
        await ShowcaseTagModel.deleteMany({ showcase_id: _id });
        for (let i = 0; i < tags.length; i++) {
            let item = tags[i];
            let tag = new ShowcaseTagModel({
                showcase_id: _id,
                tag: item
            })
            await tag.save();
        }
        return { success: true, msg: "Tags updated succesfully" }

    } catch (err) {
        console.log(err);
        return { success: false, msg: "Failed to update tags" }

    }
}


// export const updateShowcaseVerifier = async (email: string, showcase_id: number) => {
//     "use server"
//     try {
//         let sql = `select * from showcase_verifier_details where email = ? and showcase_id = ?`
//         let data = await conn.query(sql, [email, showcase_id]) as any[];
//         if (data[0].length === 0) {
//             sql = `insert into showcase_verifier_details(email, showcase_id) values(?,?)`;
//             await conn.query(sql, [email, showcase_id]);
//         }
//         return { success: true, msg: "shwocase verifier details updated" }
//     } catch (err) {
//         return { success: false, msg: "shwocase verifier details updated" }
//     }
// }


// export const sendEmailToVerifier = async (showcase_id: number, email: string) => {
//     "use server"
//     try {
//         let sql = `select * from showcase_verifier_details where email = ? and showcase_id = ?`
//         let data = await conn.query(sql, [email, showcase_id]) as any[];
//         if (data[0].length === 0) {
//             return { success: false, msg: "Doesn't exists" }
//         }

//         let mail = new sendMail(email, "we have xxx", "hello world");
//         await mail.send();
//         sql = `update showcase_verifier_details set mailSent = ? where email = ? and showcase_id = ?`
//         await conn.query(sql, [email, showcase_id])

//         return { success: true, msg: "mail has been sent" }
//     } catch (err) {
//         return { success: false, msg: "Failed to sent" }

//     }
// }


// export const updateShowcaseVerifierDetails = async (params: ShowcaseVerifierDetails): Promise<ServerMessageInterface> => {
//     "use server"
//     try {
//         let sql = `select * from showcase_verifier_details where email = ? and showcase_id = ?`
//         let data = await conn.query(sql, [params.email, params.showcase_id]) as any[];
//         if (data[0].length === 0) {
//             sql = `insert into showcase_verifier_details(email, showcase_id) values(?,?)`;
//             await conn.query(sql, [params.email, params.showcase_id]);
//         }

//         sql = `update showcase_verifier_details set name = ?, title = ?, company = ?`;
//         await conn.query(sql, [params.name, params.title, params.company]);
//         return { success: true, msg: "shwocase verifier details updated" }


//     } catch (err) {
//         return { success: false, msg: "shwocase verifier details updated" }
//     }
// }

// export const updateVerifierEmailsOfShowcase = async (emails: string[], showcase_id: number): Promise<ServerMessageInterface> => {
//     "use server"
//     try {
//         const usr = await user();
//         if (!usr.usr) {
//             return { success: false, msg: "unauthorized" }
//         }
//         let sql = 'select * from showcase where showcase_id = ? and userid = ?';
//         let data = await conn.query(sql, [showcase_id, usr.usr.userid]) as any[];
//         if (data[0].length === 0) {
//             return { success: false, msg: "unathorized" }
//         }
//         sql = `delete from showcase_verifier where email = ? and showcase_id = ?`;
//         await Promise.all(emails.map((item) => conn.query(sql, [item, showcase_id])))
//         sql = 'insert into showcase_verifier(email, showcase_id) values(?,?);'
//         await Promise.all(emails.map((item) => conn.query(sql, [item, showcase_id])));
//         for (let i = 0; i < emails.length; i++) {
//             await updateShowcaseVerifier(emails[i], showcase_id)
//             await sendEmailToVerifier(showcase_id, emails[i]);
//         }
//     } catch (err) {
//         console.log(err);
//     }



//     return { success: false, msg: "Failed to update emails" }
// }


// export const addNewVerifierEmail = async (email: string, showcase_id: number): Promise<ServerMessageInterface> => {
//     "use server"
//     try {
//         let usr = await user();
//         if (!usr.usr) return { success: false, msg: "unauthorized" }
//         let sql = 'select * from showcase where userid = ? and showcase_id = ?';
//         let data = await conn.query(sql, [usr.usr.userid, showcase_id]) as any[];
//         if (data[0].length === 0) return { success: false, msg: "Unauthorized" };
//         sql = `select * from showcase_verfier_details where email = ? and showcase_id = ?`;
//         data = await conn.query(sql, [email, showcase_id]) as any[];
//         if (data[0].length > 0) return { success: false, msg: "Email already exists" };
//         sql = 'insert into showcase_verfier_details(email, showcase_id, verified, name, title, company, mailSent) values (?,?,?,?,?,?,?)';
//         await conn.query(sql, [email, showcase_id, false, "", "", "", false]);
//         return { success: true, msg: "Verifier added succesfully" }
//     } catch (err) {
//         console.log(err);
//         return { success: false, msg: "Failed to add verifier" }
//     }


// }

// export const removeVerifierEmail = async (email: string, showcase_id: number): Promise<ServerMessageInterface> => {
//     "use server"
//     try {
//         let usr = await user();
//         if (!usr.usr) return { success: false, msg: "unauthorized" }
//         let sql = 'select * from showcase where userid = ? and showcase_id = ?';
//         let data = await conn.query(sql, [usr.usr.userid, showcase_id]) as any[];
//         if (data[0].length === 0) return { success: false, msg: "Unauthorized" };

//         sql = 'delete from showcase_verfier_details where email = ? and showcase_id = ?';
//         await conn.query(sql, [email, showcase_id]);
//         return { success: true, msg: "Verifier deleted succesfully" }
//     } catch (err) {
//         console.log(err);
//         return { success: false, msg: "Failed to delete" }
//     }
// }