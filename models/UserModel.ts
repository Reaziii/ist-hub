import mongoose from 'mongoose'

const schema = new mongoose.Schema<UserInterface & Document>({
    fullname: String,
    department: String,
    batch: Number,
    roll_no: Number,
    phone: String,
    email: String,
    password: String,
    photo: String,
    verified: {
        type: Boolean,
        default: false,
    },
    username: String,
    email_verified: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: ""
    },
    about: String,
    resume: String
})
export default (mongoose.models.users || mongoose.model("users", schema)) as mongoose.Model<UserInterface & mongoose.Document>;