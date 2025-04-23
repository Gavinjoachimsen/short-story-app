const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const UserRouter = require('./routes/UserRoutes.js')
const StoryRouter = require('./routes/StoryRoutes.js')
const {MySqlConnection, sequelize } = require('./config/config.database.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', UserRouter)
app.use('/api/story', StoryRouter)
const PORT = process.env.PORT || 8004

const startServer = async() => {
    try{
        await MySqlConnection()
        await sequelize.sync({alter: true})
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`)
        })
    }catch(error){
        console.error("failed to start server", error)
    }
    
}

startServer()