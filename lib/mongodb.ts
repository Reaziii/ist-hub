import mongoose from 'mongoose';


let connection: {isConnected? : number} = {}

const MongoConn = async () => {
    if(connection.isConnected){
        return; 
    }
    let db = await mongoose.connect(process.env.MONGODBURI ?? "");
    console.log("mongodb connected")
    connection.isConnected = db.connections[0].readyState;
    return ;
}



export default MongoConn;