const express = require('express')
const PostController = require('../controllers/post.controller')
const { validateCreatePost } = require('../validators/post/create.validator')
const { handleValidationErrors } = require('../middleware/validator.middleware')
const { validateUpdatePost } = require('../validators/post/update.validator')
const { validateQueryParams } = require('../validators/post/get.validator')
const { validateParamId } = require('../validators/global/id.validator')

const router = express.Router()

router
    .route('/')
    .post(validateCreatePost, handleValidationErrors, PostController.createPost)
router
    .route('/')
    .get(validateQueryParams, handleValidationErrors, PostController.getPosts)
router.route('/:id').get(PostController.getPost)
router
    .route('/:id')
    .put(validateUpdatePost, handleValidationErrors, PostController.updatePost)

router.route('/:id').delete(PostController.deletePost)

module.exports = router
