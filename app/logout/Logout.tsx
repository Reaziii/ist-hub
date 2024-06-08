"use client"
import React , {FC, useEffect} from 'react'
interface Props{
  logout: ()=>Promise<void>
}
const Logout:FC<Props> = ({logout}) => {
    
    useEffect(()=>{
        logout().then(()=>{
            window.location.href = "/login"
        })
    },[])
  return (
    <div>wait...</div>
  )
}

export default Logout