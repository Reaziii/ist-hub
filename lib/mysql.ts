import mysql from 'mysql2/promise';

const conn = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSERNAME,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDB,
});


// export async function query(sql: string, values?: any[]): Promise<any[] | {}> {
//     return new Promise((result, resolve) => {
//         try {
//             conn.query(sql, [values], (err, res) => {
//                 if (err) {
//                     resolve(err);
//                 }
//                 else {
                    
//                     result(res)
//                 }
//             })
//         } catch (err) {
//             resolve(err);
//         }
//     })
// }

export const register_new_user = () => {

}



export default conn;