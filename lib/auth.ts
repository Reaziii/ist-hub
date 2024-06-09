import bcrypt from 'bcrypt'
import otpgenerator from 'otp-generator'
import sendmail from './sendmail'
import jsonwebtoken from 'jsonwebtoken'
import { user } from "./user";
import { cookies } from "next/headers";
import MongoConn from "./mongodb";
import UserModel from "@/models/UserModel";
import EmailVerificationModel from "@/models/EmailVerificationModel";
export const registration = async (name: string, email: string, dept: string, batch: number, roll: number, phone: string, pass: string, conPass: string): Promise<{ success: boolean, msg: string }> => {
    "use server";
    try {
        await MongoConn();
        if (!name || !email || !dept || !batch || !roll || !phone || !conPass || !pass) {
            return { success: false, msg: "All field required" }
        }

        if (pass !== conPass) {
            return { success: false, msg: "Password doesn't match" }
        }

        let username = `${dept.toString().toLowerCase()}-${batch}-${roll}`;
        let data = await UserModel.findOne({
            email_verified: true,
            email
        });
        console.log(data, email)
        if (data) {
            return { success: false, msg: "Email already exists" }
        }

        data = await UserModel.findOne({
            email_verified: true,
            phone
        });
        if (data) {
            return { success: false, msg: "Phone number already exists" }
        }
        data = await UserModel.findOne({
            email_verified: true,
            roll_no: roll
        });
        if (data) {
            return { success: false, msg: "Roll no already exists" }
        }
        await EmailVerificationModel.deleteMany({
            email: email
        })


        await UserModel.deleteMany({
            email
        })

        pass = await bcrypt.hash(pass, 10);

        let newUser = new UserModel({
            fullname: name,
            email,
            department: dept,
            batch,
            roll_no: roll,
            phone,
            password: pass,
            username,
            bio: "",
            about: "",
            resume: ""
        })
        await newUser.save();
        const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        let verification = new EmailVerificationModel({
            code: otp,
            email: email
        })
        await verification.save();
        let mail = new sendmail(email as string, "Email Verification - IST HUB", `Your verification code is - ${otp}`)
        await mail.send();
        return { success: true, msg: "Registration completed" }
    } catch (err) {
        console.log("someting went wrong [/lib/auth.ts/registration] - ", err);
        return { success: false, msg: "Server Error" }
    }

}


export const verifyEmail = async (email: string, code: string): Promise<{ success: boolean, msg: string }> => {
    "use server";
    try {

        await MongoConn();

        let verification = await EmailVerificationModel.findOne({
            email: email,
            code: code
        })
        if (!verification) {
            return { success: false, msg: "Invalid code" }
        }
        let user = await UserModel.findOne({ email: email });
        if (!user) {
            return { success: false, msg: "User doesn't exists" }
        }
        user.email_verified = true;
        await user.save();
        await verification.deleteOne();
        return { success: true, msg: "Verified successfully" }
    } catch (err) {
        console.log('[verifyemail failed]====>\n', err)
        return { success: false, msg: "server error" }
    }


}





export const login = async (params: { email: string, password: string }): Promise<{ success: boolean, msg: string, token?: string }> => {
    "use server";
    try {
        await MongoConn();
        let user = await UserModel.findOne({
            email: params.email,
            email_verified: true

        })
        if (!user) {
            return { success: false, msg: "Email not found!" }
        }

        let verify_pass = await bcrypt.compare(params.password, user.password);
        if (!verify_pass) {
            return { success: false, msg: "Password is incorrect" }
        }

        let token = (await signNewToken(params.email)).token;
        return { success: true, msg: "Login successfull", token }

    } catch (err) {
        console.log('[Login failed]====>\n', err)
        return { success: false, msg: "Login failed" }
    }
}

export const signNewToken = async (email?: string): Promise<{ token?: string }> => {
    try {
        if (!email)
            email = (await user()).usr?.email;
        if (!email) return {};
        let _user = await UserModel.findOne({
            email,
            email_verified: true
        })
        if (!_user) {
            return {}
        }
        let token = await jsonwebtoken.sign({
            name: _user.fullname,
            email: email,
            photo: _user.photo,
            roll_no: _user.roll_no,
            batch: _user.batch,
            username: _user.username,
            verified: _user.verified,
            _id: _user._id
        }, process.env.JWTSECRET ?? "ISTHUB")
        console.log(token)
        cookies().set('token', token as string)
        return { token }

    } catch (err) {
        console.log("sign token failed ===> ", err)
    }
    return {};
}


export const forgetpassword = async (form: FormData): Promise<{ success: boolean, msg: string }> => {
    try {
        const email = form.get("email") as string | null;
        if (!email) {
            return { success: false, msg: "Email is invalid" }
        }

        let user = await UserModel.findOne({email, email_verified : true})
        if(!user){
            return {success : false, msg : "Invalid email address"}
        }
        const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        let verify = new EmailVerificationModel({
            code : otp,
            email : email
        })
        await verify.save();
        let mail = new sendmail(email as string, "Email Verification - IST HUB", `Your verification code is - ${otp}`)
        await mail.send();
        return { success: true, msg: "OTP has been sent" }
    } catch (err) {
        console.log('[forgetpassword failed]====>\n', err)
        return { success: false, msg: "Server error!" }
    }
}

export const verifyAndChangePassword = async (form: FormData): Promise<{ success: boolean, msg: string }> => {
    try {
        let email = form.get("email")
        let password = form.get("password") as string;
        let confirmpassword = form.get("con-pass")
        let code = form.get("code");
        if (password !== confirmpassword) {
            return { success: false, msg: "Confirm password doesn't match" }
        }
        let verify = await verifyEmail(email as string, code as string);

        if (verify.success === false) {
            return verify;
        }
        let user = await UserModel.findOne({
            email : email,

        })
        if(!user){
            return {success : false, msg : "Invalid email address"};
        }
        let hash = await bcrypt.hash(password, 10);
        user.password = hash;
        await user.save();
        return { success: true, msg: "Password changed" };
    } catch (err) {
        console.log('[verifyandchangepassword failed]====>\n', err)
        return { success: true, msg: "Server error" }
    }
}

export const logout = async () => {
    "use server";
    cookies().delete("token")
}