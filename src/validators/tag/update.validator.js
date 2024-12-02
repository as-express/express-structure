const { check } = require('express-validator')

module.exports.validateUpdateTag = [
    check('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),
]
