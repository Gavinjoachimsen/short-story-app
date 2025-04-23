const express = require('express')
const StoryRouter = express.Router()
const {createStory, getAllStories, getUserStories} = require('../controllers/StoryController.js')


StoryRouter.route('/')
    .get( getAllStories )



StoryRouter.route('/:id')
    .post( createStory )
    .get( getUserStories )


module.exports = StoryRouter