import mongoose from "mongoose";

const schema = new mongoose.Schema<AdminUserInviationInterface & mongoose.Document>({
    email:String,
    code: String,
    time: Date,
    invitedUserId : String,
})

export default (mongoose.models.admininvitations || mongoose.model("admininvitations", schema)) as mongoose.Model<AdminUserInviationInterface & mongoose.Document>