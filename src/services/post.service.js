const {
    getCache,
    setCache,
    removeCache,
} = require('../common/helpers/redis.helper')
const PostRepository = require('../repository/post.repository')
const TagRepository = require('../repository/tag.repository')

class PostService {
    constructor() {
        this.repository = PostRepository
        this.tagRepository = TagRepository
    }

    async createPost(args) {
        try {
            let validTags = []
            for (const tagId of args.tags) {
                const tag = await this.tagRepository.getTitle(tagId)

                validTags.push(tag._id)
            }
            args.tags = validTags
            args.tagCount = args.tags.length

            await removeCache('posts')
            return await this.repository.createPost(args)
        } catch (err) {
            this.handleError(err)
        }
    }

    async getPost(id) {
        try {
            console.log(id)
            return await this.repository.getPost(id)
        } catch (err) {
            this.handleError(err)
        }
    }

    async getPosts(page, limit) {
        try {
            const cache = await getCache('posts')
            if (cache != null) {
                return cache
            }
            const posts = await this.repository.getPosts(page, limit)
            await setCache('posts', posts)
            return posts
        } catch (err) {
            this.handleError(err)
        }
    }

    async updatePost(id, args) {
        try {
            return await this.repository.updatePost(id, args)
        } catch (err) {
            this.handleError(err)
        }
    }

    async deletePost(id) {
        try {
            await this.repository.deletePost(id)
            return true
        } catch (err) {
            this.handleError(err)
        }
    }

    handleError(err) {
        console.log('Server error')
        throw new Error(err)
    }
}

module.exports = new PostService()
