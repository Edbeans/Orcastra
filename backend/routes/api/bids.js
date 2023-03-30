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
        { _id: bid.idea },
        { $push: { bids: bid._id } }
      );

      await User.updateOne(
        { _id: bid.bidder },
        { $push: { bids: bid._id } }
      );
      bid = await bid.populate('bidder');
      return res.json(bid);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/ideas/:ideaId', async (req, res, next) => {
  try {
    const bids = await Bid.find({
      idea: req.params.ideaId,
    }).populate({
      path: 'bidder',
      select: '_id username profileImageUrl',
    });
    return res.json(bids);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const bids = await Bid.find()
      .populate({
        path: 'bidder',
        select: '_id username profileImageUrl',
      })
      .populate({ path: 'idea', select: '_id title body' });
    return res.json(bids);
  } catch (error) {
    next(error);
  }
});

router.get('/users/:userId/', requireUser, async (req, res, next) => {
  try {
    const bids = await Bid.find({
      bidder: req.params.userId,
    }).populate('idea');
    return res.json(bids);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
