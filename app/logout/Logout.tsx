"use client"
import React , {FC, useEffect} from 'react'

const Logout:FC<{logout: ()=>Promise<void>}> = ({logout}) => {
    
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