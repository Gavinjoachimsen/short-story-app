import React , {useState}from "react"
import { registerUser, userLogin } from "../Services/User_Services"
import { useNavigate} from "react-router-dom"

export const LoginPage = () =>{
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const updateFormData =(e)=>{
        const {name, value} = e.target
        setFormData(prev =>({...prev, [name] : value}))
    }

    const handleLogin = async(e) =>{
        e.preventDefault()
        try{
             const response = await userLogin(formData)
             console.log(response)
            localStorage.setItem("user", JSON.stringify(response))
            navigate('/dashboard')
        }catch(error){console.log(error)}
    }

    const handleRegister =(e)=>{
        e.preventDefault()
        registerUser(formData)
            .then(() => {navigate('/')})
            .catch(error => console.log(error))
    }
    return (<>
        <h1>Login:</h1>
    <form onSubmit={handleLogin}>
        <label>
            Username:
            <input 
            type="text" 
            name='username'
            onChange={updateFormData}
            />
        </label>
        <label>
            Password: 
            <input 
            type="password" 
            name='password'
            onChange={updateFormData}
            />
        </label>
        <input type="submit"/>
    </form>

    <h2>Register:</h2>
    <form onSubmit={handleRegister}>
        <label>
            Name:
            <input 
            type="text"
            name="name" 
            onChange={updateFormData}
            />
        </label> 
        <label>
            UserName:
            <input 
            type="text" 
            name="username"
            onChange={updateFormData}
            />
        </label>
        <label>
            Email:
            <input 
            type="text" 
            name="email"
            onChange={updateFormData}
            />
        </label>
        <label>
            Password:
            <input 
            type="text" 
            name="password"
            onChange={updateFormData}
            />
        </label>
        <label>
            Confirm Password:
            <input 
            type="text" 
            name="confirmPassword"
            onChange={updateFormData}
            />
        </label>
        <input type="submit" />
    </form>
    
    
    </>)
}