const express = require('express')
const UserRouter = express.Router()
const {registerUser, getAllUsers, getUserById, deleteUserById, userLogin } =require('../controllers/User.Controller.js')

UserRouter.route('/')
    .post( registerUser )
    .get(  getAllUsers)
    
UserRouter.route('/:id')
    .get( getUserById )
    .delete( deleteUserById )

UserRouter.route('/login')
    .post( userLogin )

module.exports = UserRouter