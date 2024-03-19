import conn from '@/lib/mysql'
import React, { FC } from 'react'

const Registration: FC<React.ReactNode> = () => {
    conn.query(`CREATE TABLE Persons (
        PersonID int,
        LastName varchar(255),
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255)
    );`, (err, res)=>{
        if(err){
            console.log("something went wrong");
        }
        else{
            console.log(res)
        }
    })
    return (
        <div>Registration</div>
    )
}

export default Registration