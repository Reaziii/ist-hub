import mongoose from "mongoose";


const schema = new mongoose.Schema<SkillInterface & mongoose.Document>({
    userid : String,
    skill : String,
})


export default (mongoose.models.skills || mongoose.model("skills", schema)) as mongoose.Model<SkillInterface & mongoose.Document>