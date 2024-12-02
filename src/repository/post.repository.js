const postModel = require('../models/post.model')
const tagRepository = require('./tag.repository')

class PostRepository {
    constructor() {
        this.PostModel = postModel
        this.TagRepository = tagRepository
    }

    async createPost(data) {
        try {
            const { title, image, tagCount, tags } = data
            const post = new this.PostModel({
                title,
                image,
                tags,
                tagCount,
            })
            await post.save()
            await this.TagRepository.pushPost(post.tags, post._id)

            return post
        } catch (err) {
            this.handleError(err)
        }
    }
    async getPost(id) {
        try {
            const post = await this.PostModel.findById(id).populate('tags')
            if (!post) {
                return { message: 'Post not found' }
            }
            return post
        } catch (err) {
            this.handleError(err)
        }
    }
    async getPosts(page, limit) {
        try {
            page ? (page = page) : (page = 1)
            limit ? (limit = limit) : (limit = 10)

            const posts = await this.PostModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec()

            const totalPosts = await this.PostModel.countDocuments()
            const totalPages = Math.ceil(totalPosts / limit)

            return {
                posts,
                page,
                totalPosts,
                totalPages,
            }
        } catch (err) {
            this.handleError(err)
        }
    }
    async updatePost(id, data) {
        try {
            const post = await this.PostModel.findByIdAndUpdate(id, data, {
                new: true,
            })
            await post.save()
            return post
        } catch (err) {
            this.handleError(err)
        }
    }
    async deletePost(id) {
        try {
            const post = await this.getPost(id)
            await this.TagRepository.unPushPost(post.tags, post._id)
            await this.PostModel.findByIdAndDelete(id)

            return true
        } catch (err) {
            this.handleError(err)
        }
    }

    async unPushTag(id) {
        try {
            await this.PostModel.updateMany(
                { tags: id },
                {
                    $inc: { tagCount: -1 },
                    $pull: { tags: id },
                }
            )
            return true
        } catch (err) {
            this.handleError(err)
        }
    }

    async deleteMany(tagId) {
        try {
            await this.PostModel.deleteMany({
                tags: tagId,
            })
        } catch (err) {
            this.handleError(err)
        }
    }

    handleError(err) {
        console.log('Server error', err.message)
    }
}

module.exports = new PostRepository()
