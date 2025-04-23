import React from "react"

export const Header =()=>{
    const user = JSON.parse(localStorage.getItem("user"))
   
    return(<>
    <div className="header">
        <h1>Welcome {user.name}</h1>
        <div className="links">

        </div>
    </div>
 
    
    </>)
}