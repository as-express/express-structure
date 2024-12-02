const TagService = require('../services/tag.service')

class TagController {
    constructor() {
        ;(this.service = TagService),
            (this.createTag = this.createTag.bind(this)),
            (this.getTags = this.getTags.bind(this)),
            (this.getTag = this.getTag.bind(this)),
            (this.updateTag = this.updateTag.bind(this)),
            (this.deleteTag = this.deleteTag.bind(this))
    }

    async createTag(req, res) {
        try {
            const tag = await this.service.createTag(req.body)
            res.status(201).json(tag)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async getTags(req, res) {
        try {
            const tag = await this.service.getTags()
            res.status(200).json(tag)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async getTag(req, res) {
        try {
            const { id } = req.params
            const tag = await this.service.getTag(id)

            res.status(200).json(tag)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async updateTag(req, res) {
        try {
            const { id } = req.params
            const { data } = req.body
            const tag = await this.service.updateTag(id, data)

            res.status(200).json(tag)
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async deleteTag(req, res) {
        try {
            const { id } = req.params
            await this.service.deleteTag(id)

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

module.exports = new TagController()
