const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema(
  {
    bidder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    idea: {
      type: Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bid', bidSchema);
