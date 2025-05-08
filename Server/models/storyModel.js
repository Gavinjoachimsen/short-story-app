const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/config.database.js")
const User = require('../models/userModel.js')

const Story = sequelize.define("Story", {
    StoryId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false, 
        validate:{
            notEmpty:{ msg: "Title must not be empty!"}, 
            len: {args: [5, 255], msg:"Title must be at least 5 characters long."} }},  
    author:{ type: DataTypes.STRING, allowNull: false, 
        validate:{ 
            notNull: { msg: "Author is required!" },
             len:{ args: [4, 20], msg: "Author must be at least 4 characters long."},
        }},
    genre:{type: DataTypes.STRING, allowNull: false, 
        validate:{
            notEmpty: {msg: "Genre is required"},
             }}, 
    story: {type: DataTypes.TEXT('long'), allowNull: false, 
        validate:{ 
            notEmpty:{ msg: "Story must not be empty"}, 
            len: {args: [100,7000 ], msg:" Story Has to be at least 100-7000 characters long."} }}, 
    published: {type:DataTypes.DATE, defaultValue: DataTypes.NOW},

})

Story.belongsTo(User, {foreignKey: "userId"})
User.hasMany(Story, {foreignKey: "userId"})
module.exports = Story;