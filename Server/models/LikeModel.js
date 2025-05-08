const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/config.database.js")
const User = require('../models/userModel.js')
const Story = require('../models/storyModel.js')

const Like = sequelize.define("Like", {
    LikeId : {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }, {timestamps: true})


User.hasMany(Like, {foreignKey: "userId"})
Like.belongsTo(User, {foreignKey: "userId"})

Story.hasMany(Like, {foreignKey: "storyId"})
Like.belongsTo(Story, {foreignKey: "storyId"})

module.exports = Like