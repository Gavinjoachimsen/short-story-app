const Story = require('../models/storyModel.js')
const User = require('../models/userModel.js')

const createStory = async(req, res) =>{
    try{
        const { id } = req.params
 
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }
        const STORY = await Story.create({ ...req.body , userId: id})
        return res.status(201).json(STORY)
    }catch(error){
        res.status(500).json( error )
    }
}

const getAllStories = async (req, res) =>{
    try{
        const STORIES = await Story.findAll()
        res.status(200).json(STORIES)
    }catch(error){
        res.status(500).json(error)
    }
}

const getUserStories = async (req , res)=>{
    try{
        const { id } = req.params
        const USER = await User.findByPk(id)
        if(!USER){
            return res.status(404).json({error: "User not found"})
        }
        const STORY = await Story.findAll({ where:{ userId: id } })
        return res.status(200).json(STORY)
    }catch(error){
        res.status(500).json({error: "Failed to fetch Story"})
    }
}


module.exports = { createStory, getAllStories, getUserStories }