const { param } = require('express-validator')

module.exports.validateParamId = [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
]
