const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Idea = mongoose.model('Idea');
const { requireUser } = require('../../config/passport');
const validateIdeasInput = require('../../validations/ideas');
const {
  multipleFilesUpload,
  multipleMulterUpload,
} = require('../../awsS3');

router.get('/', async (req, res, next) => {
  try {
    const ideas = await Idea.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'owner',
        select: 'username profileImageUrl',
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: '_id _id username profileImageUrl',
        },
      })
      .populate('bids');
    return res.json(ideas);
  } catch (error) {
    res.json([]);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'owner',
        select: 'username profileImageUrl',
      });

    return res.json(idea);
  } catch (err) {
    const error = new Error('Idea not found');
    error.statusCode = 404;
    error.errors = { message: 'No idea with that id found' };
    return next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      err.errors = { message: 'No user with that id found' };
      return next(err);
    }
    const ideas = await Idea.find({ owner: user._id })
      .sort({ createdAt: -1 })
      .populate('owner', '_id username profileImageUrl')
      .populate('comments')
      .populate('bids');
    return res.json(ideas);
  } catch (error) {
    return res.json([]);
  }
});
router.post(
  '/',
  multipleMulterUpload('images'),
  requireUser,
  validateIdeasInput,
  async (req, res, next) => {
    const imageUrls = await multipleFilesUpload({
      files: req.files,
      public: true,
    });
    try {
      const newIdea = new Idea({
        owner: req.user._id,
        title: req.body.title,
        body: req.body.body,
        imageUrls,
        bids: req.body.bids,
        comments: req.body.comments,
      });

      let idea = await newIdea.save();
      idea = await idea;
      return res.json(idea);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  requireUser,
  validateIdeasInput,
  async (req, res, next) => {
    try {
      let idea = await Idea.findById(req.params.id);
      if (!idea) {
        const error = new Error('Idea not found');
        error.statusCode = 404;
        error.errors = { message: 'No idea found with that id' };
        return next(error);
      }

      if (idea.owner.toString() !== req.user._id.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        error.errors = {
          message:
            'Only the owner of this idea is authorized to update it',
        };
        return next(error);
      }
      (idea.owner = req.user._id),
        (idea.title = req.body.title),
        (idea.body = req.body.body),
        await idea.save();

      idea = await Idea.findById(req.params.id)
        .populate('owner', '_id, username profileImageUrl')
        .populate('comments')
        .populate('bids');

      return res.json(idea);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    let id = req.params.id;
    let idea = await Idea.findOneAndDelete({ _id: id });
    await User.updateOne(
      { _id: idea.owner._id },
      { $pull: { ideas: idea._id } }
    );
    return res.json({ message: 'Idea deleted!' });
  } catch (err) {
    const error = new Error('Idea could not be deleted');
    error.statusCode = 422;
    error.errors = { message: 'Idea could not be deleted' };
    return next(err);
  }
});

module.exports = router;
