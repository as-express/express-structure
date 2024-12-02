const express = require('express')
const TagController = require('../controllers/tag.controller')
const { validateCreateTag } = require('../validators/tag/create.validator')
const { validateParamId } = require('../validators/global/id.validator')
const { validateUpdateTag } = require('../validators/tag/update.validator')
const { handleValidationErrors } = require('../middleware/validator.middleware')

const router = express.Router()

router
    .route('/')
    .post(validateCreateTag, handleValidationErrors, TagController.createTag)
router.route('/').get(TagController.getTags)
router.route('/:id').get(TagController.getTag)
router
    .route('/:id')
    .put(validateUpdateTag, handleValidationErrors, TagController.updateTag)

router.route('/:id').delete(TagController.deleteTag)

module.exports = router
