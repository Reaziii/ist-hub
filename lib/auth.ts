import conn from "./mysql";

import otpgenerator from 'otp-generator'
import sendmail from './sendmail'

export const registration = async (form: FormData): Promise<{ success: boolean, msg?: string }> => {
    try {
        let name = form.get("name");
        let email = form.get("email")
        let dept = form.get("department")
        let batch = form.get("batch")
        let roll = form.get("roll")
        let phone = form.get("phone")
        let pass = form.get("password")
        let conPass = form.get("con-pass")

        if (!name || !email || !dept || !batch || !roll || !phone || !conPass || !pass) {
            return { success: false, msg: "All field required" }
        }

        if (pass !== conPass) {
            return { success: false, msg: "Password doesn't match" }
        }

        let values = [
            [name, dept, batch, roll, phone, email, pass]
        ]

        let sql = "select * from user where (email = ? or roll_no=? or phone=?) and verified=true";

        let data = await conn.query(sql, [email, roll, phone]) as any[];
        if (data[0].length === 1) {
            return { success: false, msg: "email or roll or phone already exists" }
        }
        sql = "delete from email_verification where email = ?"
        await conn.query(sql, [email]);
        sql = "delete from user where email = ?"
        await conn.query(sql, [email]);
        sql = `insert into user(fullname, department, batch, roll_no, phone, email, password) values ?`
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
        mail.send();
        return {success : true, msg : "Registration completed"}
    } catch (err) {
        console.log("someting went wrong [/lib/auth.ts/registration] - ", err);
        return {success : false, msg : "Server Error"}
    }

}






