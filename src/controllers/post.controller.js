const PostService = require('../services/post.service')

class PostController {
    constructor() {
        ;(this.service = PostService),
            (this.createPost = this.createPost.bind(this)),
            (this.getPosts = this.getPosts.bind(this)),
            (this.getPost = this.getPost.bind(this)),
            (this.updatePost = this.updatePost.bind(this)),
            (this.deletePost = this.deletePost.bind(this))
    }

    async createPost(req, res) {
        try {
            const post = await this.service.createPost(req.body)
            res.status(201).json(post)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async getPosts(req, res) {
        try {
            const { page, limit } = req.query
            const post = await this.service.getPosts(page, limit)
            res.status(200).json(post)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async getPost(req, res) {
        try {
            const { id } = req.params
            const post = await this.service.getPost(id)

            res.status(200).json(post)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async updatePost(req, res) {
        try {
            const { id } = req.params
            const post = await this.service.updatePost(id, req.body)

            res.status(200).json(post)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params
            await this.service.deletePost(id)

            res.status(200).json(true)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    handleError(err, res) {
        console.log('Server Error')
        res.status(500).json({ message: err.message })
    }
}

module.exports = new PostController()
