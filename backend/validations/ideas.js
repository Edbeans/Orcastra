const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateIdeasInput = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage(
      'Title is required and must be between 1 and 50 characters'
    ),
  check('body')
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage(
      'Body is required and must be at least 10 characters'
    ),
  handleValidationErrors,
];

module.exports = validateIdeasInput;
