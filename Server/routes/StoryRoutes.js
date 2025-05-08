const express = require('express')
const StoryRouter = express.Router()
const {createStory, getAllStories, getUserStories, getStory, deleteStoryById, updateStoryById, manageLikes, countLikes, checkUserLiked, findMostLiked} = require('../controllers/StoryController.js')


StoryRouter.route('/')
    .get( getAllStories )



StoryRouter.route('/:id')
    .post( createStory )
    .get( getUserStories )
    .put( updateStoryById )
    .delete( deleteStoryById )


StoryRouter.route('/likes/:StoryId')
    .post( manageLikes )
    .get( countLikes )


StoryRouter.route('/liked/:StoryId/:UserId')
    .get( checkUserLiked )

StoryRouter.route('/story/:StoryId')
    .get( getStory )


StoryRouter.route('/mostliked')
    .get( findMostLiked)
module.exports = StoryRouter