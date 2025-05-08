const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/config.database.js")


const User = sequelize.define("User", {
    UserId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username:{type: DataTypes.STRING, allowNull: false, unique: true, 
        validate:{
            notNull: { msg: "Username is required" },
            notEmpty:{ msg: "UserName must not be empty"}, 
            len: {args: [5, 30], msg:"UserName must be between 5-30 characters long!"} }},  
    email:{ type: DataTypes.STRING, allowNull: false, unique: true ,
        validate:{ 
            notNull: { msg: "Email is required" },
            notEmpty: { msg: "Email cannot be empty" },
             len:{ args: [5, 100], msg: "Email must be between 5-100 characters!"},
            isEmail: { msg: "Valid Email is required"} }},
    password:{type: DataTypes.STRING, allowNull: false, 
        validate:{
            notNull: { msg: "Password is required" },
            notEmpty: {msg: "Password is required"},
            len: {args: [8, 255], msg:"password must be at least 8 characters long!"}
        }},
    name: {type: DataTypes.STRING, allowNull: false, 
        validate:{ 
            notNull: { msg: "Name is required" },
            notEmpty:{ msg: "Name must not be empty"}, 
            len: {args: [5, 30], msg:"Name must be between 5-30 characters long!"} }}, 
})

module.exports = User