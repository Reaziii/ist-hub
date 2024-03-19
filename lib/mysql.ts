import mysql from 'mysql';

const conn = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSERNAME,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDB,
});


export const register_new_user = () =>{

}



export default conn;