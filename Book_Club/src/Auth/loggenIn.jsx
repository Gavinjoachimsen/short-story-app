import { useNavigate } from "react-router-dom"


export const useAuth = ()=>{
    const navigate = useNavigate()

    const setUser = localStorage.getItem("user")
    const user = setUser ? JSON.parse(setUser) : null
    
    const logout =()=>{
        localStorage.removeItem('user')
        navigate('/')
    }
    return{
            logout ,
            isLoggedIn : !!user,
            user, 
            name : user?.name

        }
    
}