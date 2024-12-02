'use strict'
const express = require('express')
const dotenv = require('dotenv').config()
const compression = require('compression')
const helmet = require('helmet')
const rater = require('../config/rate-limiter.config')
const databaseConnection = require('../config/database.config')
const postRoutes = require('./routes/post.routes')
const tagRoutes = require('./routes/tag.routes')
require('colors')

const app = express()
const port = 3000 || process.env.PORT()
databaseConnection()

app.use(
    express.json({
        limit: '20kb',
    })
)
app.use(helmet())
app.use(compression())
app.use(rater)

app.use('/api/post', postRoutes)
app.use('/api/tag', tagRoutes)

app.listen(port, () => {
    console.log(`Server run on port ${port} 🚀`.bgGreen)
})
