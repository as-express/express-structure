const Redis = require('ioredis')
require('colors')

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

redis.on('connect', () => {
    console.log('Redis connected success'.bgGreen)
})

module.exports = redis
