const User = require('../models/userModel.js')
const bcrypt = require("bcryptjs")

const registerUser = async (req, res)=>{
    try{
        const {username, name, password , confirmPassword, email } = req.body
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match!"})
        }

        if (password.length < 8 || password.length > 50) {
            return res.status(400).json({error: "Password has to be between 8-50 characters long!"})
          }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const USER = await User.create({
            username,
            password : hashedPassword,
            name, 
            email
        })
        res.status(201).json(USER)
    }catch(error){
        res.status(400).json(error)
    }
}


const getAllUsers = async (req, res) =>{
    try{
        const USERS = await User.findAll()
        res.status(200).json(USERS)
    }catch(error){
        res.status(500).json(error)
    }
}


const getUserById = async(req, res)=>{
    const { id } = req.params
    try{
       const USER = await User.findByPk( id )
       res.status(200).json(USER)
    }catch(error){
        res.status(500).json(error)
    }
}

const deleteUserById = async(req, res)=>{
    const { id } = req.params
    try{
        const USER = await User.destroy({where:{ UserId: id} })
        res.status(200).json(USER)
    }catch(error){
        res.status(500).json(error)
    }
}

const userLogin = async (req, res)=>{
        const {username, password} = req.body
        const user = await User.findOne({where: {username }})
  
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error: "Invalid credentials"})
        }
        return res.json( user )
    }


module.exports = { registerUser, getAllUsers , getUserById, deleteUserById, userLogin}

