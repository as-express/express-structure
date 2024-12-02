const { check } = require('express-validator')

module.exports.validateUpdatePost = [
    check('title')
        .optional()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),
    check('image')
        .optional()
        .notEmpty()
        .withMessage('Image is required')
        .isLength({ min: 10 })
        .withMessage('Image must be at least 10 characters long'),

    check('tags')
        .optional()
        .notEmpty()
        .isArray()
        .withMessage('Tags is required')
        .withMessage('Tag need not empty'),
]
