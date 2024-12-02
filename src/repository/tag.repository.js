const tagModel = require('../models/tag.model')
const postRepository = require('../repository/post.repository')

class TagRepository {
    constructor() {
        this.TagModel = tagModel
        this.PostRepository = postRepository
    }

    async createTag(data) {
        try {
            const { title } = data
            const tag = new this.TagModel({
                title,
            })
            await tag.save()

            return tag
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async pushPost(tags, postId) {
        try {
            await Promise.all(
                tags.map(async (i) => {
                    const tag = await this.TagModel.findByIdAndUpdate(i, {
                        $inc: { postCount: +1 },
                        $push: { posts: postId },
                    })

                    await tag.save()
                })
            )
            return true
        } catch (err) {
            this.handleError(err)
        }
    }

    async unPushPost(tags, postId) {
        try {
            await Promise.all(
                tags.map(async (i) => {
                    const tag = await this.TagModel.findByIdAndUpdate(i, {
                        $inc: { postCount: -1 },
                        $pull: { posts: postId },
                    })

                    await tag.save()
                })
            )
            return true
        } catch (err) {
            this.handleError(err)
        }
    }

    async getTag(id) {
        try {
            const tag = await this.TagModel.findById(id).populate('posts')
            if (!tag) {
                return { message: 'Tag not found' }
            }
            return tag
        } catch (err) {
            this.handleError(err)
        }
    }

    async getTitle(title) {
        try {
            const tag = await this.TagModel.findOne({ title })
            if (!tag) {
                const newTag = new this.TagModel({
                    title,
                })
                await newTag.save()
                return newTag
            }
            return tag
        } catch (err) {
            this.handleError(err)
        }
    }

    async getTags() {
        try {
            const tags = await this.TagModel.find({})
            return tags
        } catch (err) {
            this.handleError(err)
        }
    }
    async updateTag(id, data) {
        try {
            const tag = await this.TagModel.findByIdAndUpdate(id, data)
            return tag
        } catch (err) {
            this.handleError(err)
        }
    }
    async deleteTag(id) {
        try {
            await this.PostRepository.unPushTag(id)
            await this.TagModel.findByIdAndDelete(id)
        } catch (err) {
            this.handleError(err)
        }
    }
    handleError(err) {
        console.log('Server error', err.message)
    }
}

module.exports = new TagRepository()
