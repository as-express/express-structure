const {
    getCache,
    setCache,
    removeCache,
} = require('../common/helpers/redis.helper')
const TagRepository = require('../repository/tag.repository')

class TagService {
    constructor() {
        this.repository = TagRepository
    }

    async createTag(args) {
        try {
            await removeCache('tags')
            return await this.repository.createTag(args)
        } catch (err) {
            this.handleError(err)
        }
    }

    async getTag(id) {
        try {
            return await this.repository.getTag(id)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async getTags(page, limit) {
        try {
            const cache = await getCache('tags')
            if (cache != null) {
                return cache
            }
            const tags = await this.repository.getTags(page, limit)

            await setCache('tags', tags)
            return tags
        } catch (err) {
            this.handleError(err)
        }
    }

    async updateTag(id, args) {
        try {
            return this.repository.updateTag(id, args)
        } catch (err) {
            this.handleError(err)
        }
    }

    async deleteTag(id) {
        try {
            return this.repository.deleteTag(id)
        } catch (err) {
            this.handleError(err)
        }
    }

    handleError(err) {
        console.log('Server error')
        throw new Error(err)
    }
}

module.exports = new TagService()
