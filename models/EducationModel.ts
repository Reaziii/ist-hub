import mongoose from "mongoose";
import { string } from "yup";


const Schema = new mongoose.Schema<EducationInterface & mongoose.Document>({
    school : String,
    degree : String,
    grade : Number,
    start_date : Date,
    end_date : Date,
    still : Boolean,
    userid : String

})

export default (mongoose.models.educations || mongoose.model("educations", Schema)) as mongoose.Model<EducationInterface & mongoose.Document>