const Story = require('../models/storyModel.js')
const User = require('../models/userModel.js')
const Like = require('../models/LikeModel.js')
const { ValidationError, UniqueConstraintError } = require("sequelize");

const createStory = async(req, res) =>{
    try{
        const { id } = req.params
 
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }
        const STORY = Story.build({ ...req.body , userId: id})
        await STORY.validate()

        await STORY.save();
        return res.status(201).json(STORY)
    }catch(error){
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ errors: messages });
        }

        return res.status(500).json({ errors: ["Something went wrong."] });
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

const getStory = async(req , res )=>{
    try{
        const {StoryId} = req.params

        const STORY = await Story.findByPk(StoryId)
        return res.status(200).json(STORY)
    }catch(error){
        res.status(500).json({error: "Failed to fetch story"})
    }
}

const deleteStoryById = async (req , res) =>{
    try{
        const{ id } = req.params
        const STORY = await Story.destroy({where: { StoryId : id }})
        return res.status(200).json(STORY)
    }catch(error){
        res.status(500).json({error : "Failed to delete Story"})
    }
}


const updateStoryById = async (req, res)=>{
    try{
        const { id } = req.params
        const story = await Story.findByPk(id)

        if(!story){
            return res.status(404).json({error : "story not found"})
        }

        Object.assign( story, req.body )
        await story.validate()
        await story.save()

        return res.status(200).json( story )
    }catch(error){
        console.log(error)
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ errors: messages });
        }

        console.error(error);
        return res.status(500).json({ errors: ["Something went wrong."] });
    }
}


const manageLikes = async (req , res)=>{
    try{
        const { UserId } = req.body
        const { StoryId } = req.params 
        console.log("UserId:", UserId, "StoryId:", StoryId)
        if (!UserId || !StoryId) {
            return res.status(400).json({ error: "Missing UserId or StoryId" })
        }

        const existingLike = await Like.findOne({where : { userId : UserId, storyId : StoryId }})

        if(existingLike){
            await existingLike.destroy()
            return res.status(200).json({ liked : false})
        }else{
            await Like.create({userId : UserId, storyId : StoryId})
            return res.status(200).json({ liked: true})
        }
    }catch(error){
        res.status(500).json({error : "Failed to manage Like!"})
    }
}

const countLikes = async(req, res)=>{
    try{
        const { StoryId } = req.params
        const count = await Like.count({where: { storyId : StoryId }})
        res.status(200).json( count )
    }catch(error){
        res.status(500).json({error: "Failed to manage Like", detail: error.message})
    }
}



const checkUserLiked= async(req , res )=>{
    try{
        const {StoryId, UserId } = req.params
        const like = await Like.findOne({where : { storyId : StoryId, userId: UserId }})
        res.status(200).json({ liked: !!like })
    }catch(error){
        res.status(500).json({error: "Failed to check like status "})
    }
}

const findMostLiked = async(req , res)=>{
    try{
        const like = await Like.findAll()
        
        res.status(200).json(like)
    }catch(error){
        res.status(500).json({error: "Failed to check like status "})
    }
}



module.exports = { createStory, getAllStories, getUserStories , getStory, deleteStoryById , updateStoryById, manageLikes, countLikes, checkUserLiked , findMostLiked}


