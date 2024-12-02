const mongoose = require('mongoose')

const Tag = new mongoose.Schema({
    title: { type: String, required: true },
    postCount: { type: Number, default: 0 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
})

const tagModel = mongoose.model('Tag', Tag)
module.exports = tagModel
