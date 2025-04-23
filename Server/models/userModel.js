const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/config.database.js")


const User = sequelize.define("User", {
    UserId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username:{type: DataTypes.STRING, allowNull: false, unique: true, 
        validate:{
            notEmpty:{ msg: "UserName must not be empty"}, 
            len: {args: [5,15], msg:"UserName must be between 5-15 characters long!"} }},  
    email:{ type: DataTypes.STRING, allowNull: false, unique: true ,
        validate:{ 
            notNull: { msg: "Email is required" },
            notEmpty: { msg: "Email cannot be empty" },
             len:{ args: [5, 100], msg: "Email must be between 5-100 characters!"},
            isEmail: { msg: "Valid Email is required"} }},
    password:{type: DataTypes.STRING, allowNull: false, 
        validate:{
            notEmpty: {msg: "Password is required"},
             len: {args: [ 7 ], msg: "Password must be between 8-50 characters long!"} }}, 
    name: {type: DataTypes.STRING, allowNull: false, 
        validate:{ 
            notEmpty:{ msg: "Name must not be empty"}, 
            len: {args: [5, 15], msg:"Name must be between 5-15 characters long!"} }}, 
})

module.exports = User