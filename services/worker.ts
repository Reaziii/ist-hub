import MongoConn from "../lib/mongodb";
import AdminUserModal from "../models/AdminUserModel"
import bcrypt from 'bcrypt'
const createAdmin = async () => {

    try {
        await MongoConn();
        let admins = await AdminUserModal.find();
        if (admins.length === 0) {
            let email = process.env.FIRSTADMIN;
            let password = process.env.FIRSTADMINPASS;
            if (!email || !password) {
                throw "email or password from env not found"
            }
            let hash = await bcrypt.hash(password, 10);
            let newAdmin = new AdminUserModal({
                email,
                password: hash,
                name: "",
                phone: "",
                photo: "",
                invitedBy: "owner"

            });
            await newAdmin.save();
            console.log("new admin created")
        }
        else {
            console.log("Admin available")
        }
    } catch (err) {
        console.log(err);
    }

}


const __main__ = async () => {
    await createAdmin();
}

__main__();