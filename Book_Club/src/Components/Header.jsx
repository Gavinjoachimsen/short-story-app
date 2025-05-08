import React, { useState, useEffect } from "react"
import { useAuth } from "../Auth/loggenIn"
import { useNavigate } from "react-router-dom"
    
export const Header =()=>{
    const navigate = useNavigate()
    const { logout, isLoggedIn, user} = useAuth()
    useEffect(()=>{
         if (!isLoggedIn) {
        navigate("/");
      }
    },[])
   


    return(<>
    {
        isLoggedIn ? (<div className="header">
        <h1>Welcome {user.name}</h1>
        <div className="links">
            <button onClick={()=>navigate(`/dashboard`)}> Dashboard </button>
            <button onClick={()=>navigate(`/createStory/${user.UserId}`)}> Create Story </button>
            <button onClick={()=>navigate(`/myStories/${user.UserId}`)}> My Stories </button>
            <button onClick={()=>{logout()}}>Sign Out </button>
        </div>
    </div>)
    :
    (<h2> Please register or sign In</h2>)
    }
    </>)
}