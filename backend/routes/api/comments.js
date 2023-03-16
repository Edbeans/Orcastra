const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Idea = mongoose.model('Idea');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/ideas');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('author', '_id, username')
      .sort({ createdAt: -1 });
    return res.json(comments);
  } catch (error) {
    return res.json([]);
  }
});

router.post(
  '/ideas/:ideaId',
  requireUser,
  // validateCommentInput,
  async (req, res, next) => {
    try {
      const newComment = new Comment({
        text: req.body.text,
        author: req.user._id,
        idea: req.params.ideaId,
      });

      let comment = await newComment.save();
      await Idea.updateOne(
        { _id: comment.ideaId },
        { $push: { comments: comment._id } }
      );
      comment = await comment.populate(
        'author',
        '_id, username, profileImageUrl'
      );
      return (res.json(comment));
    } catch (error) {
      next(err);
    }
  }
);

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      const err = new Error('Unable to find comment');
      err.statusCode = 404;
      err.errors = { message: 'Unable to find comment with that id' };
      return next(err);
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      const err = new Error('Unauthorized');
      err.statusCode = 404;
      err.errors = {
        message:
          'Only the creator of this comment is authorized to delete it',
      };
      return next(err);
    }

    await comment.remove();
    await Idea.updateOne({ $pull: { comments: comment._id } });
    await User.updateOne(
      { _id: comment.author },
      { $pull: { comments: comment._id } }
    );
    return res.json(comment);
  } catch (error) {
    const err = new Error('Comment could not be deleted');
    err.statusCode = 422;
    err.errors = { message: 'Comment could not be deleted' };
    return next(error);
  }
});

router.patch(
  ':id',
  requireUser,
  validateCommentInput,
  async (req, res, next) => {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('author');
      if (!comment) return res.json('No comment with that id found');
      return res.json(comment);
    } catch (error) {
      const err = new Error('Comment could not be updated');
      err.statusCode = 404;
      err.errors = {
        message: 'Something went wrong. Comment could not be updated',
      };
      return next(error);
    }
  }
);

router.get('users/:userId', async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (error) {
    const err = new Error('No user with that id found');
    err.statusCode = 404;
    err.errors = { message: 'No user with that id found' };
    return next(error);
  }

  try {
    const userComments = await Comment.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate('author', '_id, username');
    return res.json(userComments);
  } catch (error) {
    return res.json([]);
  }
});

module.exports = router;
