import mongoose from "mongoose";

const schema = new mongoose.Schema<AdminUserInterface & mongoose.Document>({
    name: String,
    email: String,
    password: String,
    photo: String,
    phone: String,
    updated: {
        type: Boolean,
        default: false
    },
    invitedBy: String,
    isActive : {
        type : Boolean,
        default : true
    }
})

export default (mongoose.models.admins || mongoose.model("admins", schema)) as mongoose.Model<AdminUserInterface & mongoose.Document>