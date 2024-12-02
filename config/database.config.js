const mongoose = require('mongoose')
require('colors')

const databaseConnection = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB)
            .then(() => console.log('DB connection Success'.bgGreen))
            .catch(console.log('DB connection error'.bgRed))
    } catch (err) {
        console.log(err)
    }
}

module.exports = databaseConnection
