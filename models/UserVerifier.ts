import mongoose from 'mongoose'

const schema = new mongoose.Schema<UserVerifierInterface & mongoose.Document>({
    owner: String,
    verifiedAt: Date,
    verfier: String
})

export default (mongoose.models.userverifiers || mongoose.model("userverifiers", schema)) as mongoose.Model<UserVerifierInterface & mongoose.Document>