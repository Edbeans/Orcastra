const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 150 })
    .withMessage(
      'Text is required and must be between 1 and 150 characters'
    ),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Comments belong to a user'),
  handleValidationErrors,
];

module.exports = validateCommentInput;
