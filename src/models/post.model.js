const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    tagCount: { type: Number, default: 0 },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
})

const postModel = mongoose.model('Post', Post)
module.exports = postModel
