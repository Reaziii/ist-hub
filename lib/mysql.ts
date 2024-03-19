import mysql from 'mysql';

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ist_hub',
});


export const register_new_user = () =>{

}



export default conn;