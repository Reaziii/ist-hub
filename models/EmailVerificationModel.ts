import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: String,
    code: String,
})

export default (mongoose.models.email_verfication || mongoose.model("email_verfication", Schema)) as mongoose.Model<UserInterface & mongoose.Document>;