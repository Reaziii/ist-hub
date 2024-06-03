import { EmployeeType } from "@/constants";
import mongoose from "mongoose";
import { DateSchema } from "yup";


const schema = new mongoose.Schema<ExperieneInterfaces & mongoose.Document>({
    userid : String,
    title : String,
    employee_type : String,
    position : String,
    company_name : String,
    start_date : Date,
    end_date : {
        type : Date,
        default : Date.now()
    },
    location : String,
    still : Boolean,

})

export default (mongoose.models.experiences || mongoose.model("experiences", schema)) as mongoose.Model<ExperieneInterfaces & mongoose.Document>