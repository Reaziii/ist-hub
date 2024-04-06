import conn from "./mysql";

import otpgenerator from 'otp-generator'
import sendmail from './sendmail'
import jsonwebtoken from 'jsonwebtoken'
export const registration = async (name: string, email: string, dept: string, batch: number, roll: number, phone: string, pass: string, conPass: string): Promise<{ success: boolean, msg: string }> => {
    "use server";
    try {
        if (!name || !email || !dept || !batch || !roll || !phone || !conPass || !pass) {
            return { success: false, msg: "All field required" }
        }

        if (pass !== conPass) {
            return { success: false, msg: "Password doesn't match" }
        }
        let username = `${dept.toString().toLowerCase()}-${batch}-${roll}`;
        let values = [
            [name, dept, batch, roll, phone, email, pass, username]
        ]

        let sql = "select * from user where email_verified = ? and (email = ? or roll_no = ? or phone = ?)";

        let data = await conn.query(sql, [true, email, roll, phone]) as any[];
        console.log(data)
        if (data[0].length >= 1) {
            return { success: false, msg: "email or roll or phone already exists" }
        }
        sql = "delete from email_verification where email = ?"
        await conn.query(sql, [email]);
        sql = "delete from user where email = ?"
        await conn.query(sql, [email]);
        sql = `insert into user(fullname, department, batch, roll_no, phone, email, password, username) values ?`
        data = await conn.query(sql, [values])
        sql = `select userid from user where email = ?`
        data = await conn.query(sql, [email]) as any[]

        const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        sql = `insert into email_verification(userid, code, time,tried, email) value ?`
        let values2 = [
            [data[0][0].userid, otp, new Date().getTime(), 0, email]
        ]
        await conn.query(sql, [values2]);
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
        
        let sql = `select * from email_verification where email = ? and code = ?`
        let data = await conn.query(sql, [email, code]) as any[]

        if (data[0].length === 0) {
            return { success: false, msg: "Invalid code" }
        }

        sql = `update user set email_verified = ? where email = ?`
        data = await conn.query(sql, [true, email,])
        sql = `delete from email_verification where email = ? and code = ?`
        data = await conn.query(sql, [email, code])

        return { success: true, msg: "Verified successfully" }
    } catch (err) {
        console.log(err)
        return { success: false, msg: "server error" }
    }


}





export const login = async (form: FormData): Promise<{ success: boolean, msg?: string, token?: string }> => {
    try {
        let email = form.get("email")
        let password = form.get("password");
        console.log(email, password)
        let sql = `select * from user where email = ? and password = ? and email_verified = true`
        let data = await conn.query(sql, [email, password]) as any[]
        if (data[0].length === 0) {
            return { success: false, msg: "Invalid email or password" }
        }
        let token = jsonwebtoken.sign({
            name: data[0][0].fullname,
            email: email,
            photo: data[0][0].photo,
            roll_no: data[0][0].roll_no,
            batch: data[0][0].batch,
            username: data[0][0].username,
            verified: data[0][0].verified,
        }, process.env.JWTSECRET ?? "ISTHUB")

        return { success: true, msg: "Login successfull", token }

    } catch (err) {
        console.log(err)
    }


    return { success: false }
}

export const forgetpassword = async (form: FormData): Promise<{ success: boolean, msg: string }> => {
    try {
        const email = form.get("email") as string;
        if (!email) {
            return { success: false, msg: "Email is invalid" }
        }

        let sql = `select * from user where email = ? and email_verified = ?`
        let data = await conn.query(sql, [email, true]) as any[];
        if (data[0].length === 0) {
            return { success: false, msg: "Invalid email address" }
        }
        const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        sql = `insert into email_verification(userid, code, time,tried, email) value ?`
        let values2 = [
            [data[0][0].userid, otp, new Date().getTime(), 0, email]
        ]
        await conn.query(sql, [values2]);
        let mail = new sendmail(email as string, "Email Verification - IST HUB", `Your verification code is - ${otp}`)
        await mail.send();
        return { success: true, msg: "OTP has been sent" }


    } catch (err) {
        return { success: false, msg: "Server error!" }
    }
}

export const verifyAndChangePassword = async (form: FormData): Promise<{ success: boolean, msg?: string }> => {
    try {
        let email = form.get("email")
        let password = form.get("password");
        let confirmpassword = form.get("con-pass")
        let code = form.get("code");
        if (password !== confirmpassword) {
            return { success: false, msg: "Confirm password doesn't match" }
        }
        let verify = await verifyEmail(form);

        if (verify.success === false) {
            return verify;
        }
        let sql = `update user set password = ? where email = ?`
        let data = await conn.query(sql, [password, email]);
        return { success: true, msg: "Password changed" };
    } catch (err) {
        return { success: true, msg: "Server error" }
    }
}