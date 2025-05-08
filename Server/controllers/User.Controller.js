const User = require('../models/userModel.js')
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    try {
        const { username, name, email, password, confirmPassword } = req.body;

        const user = User.build({
            username,
            name,
            email,
            password 
        });
        await user.validate(); 

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        return res.status(201).json(user);

    } catch (error) {
        console.log(error)
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ errors: messages });
        }

        console.error(error);
        return res.status(500).json({ errors: ["Something went wrong."] });
    }
};

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

