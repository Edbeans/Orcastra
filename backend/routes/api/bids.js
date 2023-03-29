const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Bid = mongoose.model('Bid');
const Idea = mongoose.model('Idea');
const { requireUser } = require('../../config/passport');
const validateBidInput = require('../../validations/bids');

router.post(
  '/ideas/:ideaId',
  requireUser,
  validateBidInput,
  async (req, res, next) => {
    try {
      const newBid = new Bid({
        bidAmount: req.body.bidAmount,
        bidder: req.user,
        idea: req.params.ideaId,
      });

      let bid = await newBid.save();
      await Idea.updateOne(
        { _id: bid.ideaId },
        { $push: { comments: bid._id } }
      );

      await User.updateOne(
        { _id: bid.bidder },
        { $push: { comments: bid._id } }
      );
      bid = await bid.populate('bidder');
      return res.json(bid);
    } catch (error) {
      next(err);
    }
  }
);

module.exports = router;
