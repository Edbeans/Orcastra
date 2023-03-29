const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateBidInput = [
  check('bidAmount')
    .exists({ checkFalsy: true })
    .withMessage('Bid is required and must be greater than 1'),
  check('bidder')
    .exists({ checkFalsy: true })
    .withMessage('Bids must belong to a user'),
  handleValidationErrors,
];

module.exports = validateBidInput;
