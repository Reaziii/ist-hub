import UserModel from '@/models/UserModel';
import mongoose from 'mongoose';


const MongoConn = async () => {
    await mongoose.connect(process.env.MONGODBURI ?? "");
    console.log("mongodb connected")
}



export default MongoConn;