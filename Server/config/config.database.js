const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("book_club", "root", "Passcode*4", {
    host: "localhost",
    dialect: "mysql"
})

const MySqlConnection = async () => {
    try{
        await sequelize.authenticate()
        console.log("connected to mySql")
    } catch (error) {
        console.error("Connection failed", error)
    }
}

module.exports = { sequelize, MySqlConnection };