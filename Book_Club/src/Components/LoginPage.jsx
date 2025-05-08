import React, { useState } from "react";
import { registerUser, userLogin } from "../Services/User_Services";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM_DATA = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}


export const LoginPage = () => {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    const [loginData, setLoginData] = useState({username : "", password : ""})
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const [loginErrors, setLoginErrors] = useState(null)
    const [message, setMesasge] = useState([])

    const updateFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await userLogin(loginData);
            localStorage.setItem("user", JSON.stringify(response));
            navigate("/dashboard");
        } catch (error) {
            setLoginErrors("Invalid Credentials");
        }
    };

    const updateLoginData = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };


    const handleRegister = (e) => {
        e.preventDefault();
        try{
            if(formData.password !== formData.confirmPassword){
                setErrors(["Password and confirm password do not match!"])
                return 
            }
        }catch(error){console.log(error)}
        registerUser(formData)
            .then(() => {
                setFormData(DEFAULT_FORM_DATA);
                setErrors([])
                setMesasge("User made!")
            })
            .catch((error) => {setErrors(error); });
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin} >
                        <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={loginData.username}
                                className="form-control"
                                onChange={updateLoginData}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                className="form-control"
                                onChange={updateLoginData}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    {loginErrors && <p>{loginErrors}</p>}
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="row">
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={updateFormData}
                                />
                            </div>
                            <div>
                                <label >Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={updateFormData}
                                />
                            </div>
                            <div >
                                <label >Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={updateFormData}
                                />
                            </div>
                            <div >
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={updateFormData}
                                />
                            </div>
                            <div >
                                <label className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={updateFormData}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success w-100">Register</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
                {errors.length > 0 && (
                    <div className="alert alert-danger mt-2">
                        <ul className="mb-0">
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};