const redis = require('../../../config/redis.config')

module.exports.setCache = async (key, value) => {
    try {
        const cache = await redis.set(key, JSON.stringify(value), 'EX', 60)
        return cache
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.getCache = async (key) => {
    try {
        const cache = await redis.get(key)
        if (cache) {
            return JSON.parse(cache)
        }
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.removeCache = async (key) => {
    try {
        await redis.del(key)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports.clearCache = async () => {
    try {
        await redis.flushAll()
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
