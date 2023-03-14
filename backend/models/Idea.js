const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrls: {
      type: [String],
      required: false 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Idea', ideaSchema);
