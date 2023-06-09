const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Idea = mongoose.model('Idea');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/comments');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('author', '_id username')
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
        author: req.user,
        idea: req.params.ideaId,
      });

      let comment = await newComment.save();
      await Idea.updateOne(
        { _id: comment.ideaId },
        { $push: { comments: comment._id } }
      );

      await User.updateOne(
        { _id: comment.author },
        { $push: { comments: comment._id } }
      );
      comment = await comment.populate('author');
      return res.json(comment);
    } catch (error) {
      next(err);
    }
  }
);

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findOne({ _id: id });

    if (!comment) {
      const err = new Error('No comment with that id found');
      err.statusCode = 404;
      return next(err);
    }

    if (comment.author.toString() !== req.user.id) {
      const err = new Error(
        'You are not authorized to delete this comment'
      );
      err.statusCode = 403;
      return next(err);
    }

    await Comment.deleteOne({ _id: id });
    await Idea.updateOne(
      { _id: comment.idea },
      { $pull: { comments: comment._id } }
    );
    await User.updateOne(
      { _id: comment.author },
      { $pull: { comments: comment._id } }
    );
    return res.json({ message: 'Comment deleted!' });
  } catch (err) {
    const error = new Error('Comment could not be deleted');
    error.statusCode = 422;
    error.errors = { message: 'Comment could not be deleted' };
    return next(error);
  }
});

router.patch(
  '/:id',
  requireUser,
  validateCommentInput,
  async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id).populate(
        'author'
      );
      if (!comment) return res.json('No comment with that id found');

      if (comment.author.id !== req.user.id) {
        const err = new Error(
          'You are not authorized to edit this comment'
        );
        err.statusCode = 403;
        err.errors = {
          message: 'You are not authorized to edit this comment',
        };
        return next(err);
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('author');

      return res.json(updatedComment);
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

router.get('/users/:userId', async (req, res) => {
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
      .populate('author', '_id, username, profileImageUrl');
    return res.json(userComments);
  } catch (error) {
    return res.json([]);
  }
});

router.get('/ideas/:ideaId', async (req, res) => {
  let idea;
  try {
    idea = await Idea.findById(req.params.ideaId);
    const ideaComments = await Comment.find({ idea: idea._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'author',
        select: '_id _id username profileImageUrl',
      });
    return res.json(ideaComments);
  } catch (error) {
    const err = new Error('No idea with that id found');
    err.statusCode = 404;
    err.errors = { message: 'No idea with that id found' };
    return next(error);
  }
});

module.exports = router;
