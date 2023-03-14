const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Idea = mongoose.model('Idea');
const { requireUser } = require('../../config/passport');
const validateIdeasInput = require('../../validations/ideas');

router.get('/', async (req, res, next) => {
  try {
    const ideas = await Idea.find().populate(
      'owner',
      '_id, username'
    );
    return res.json(ideas);
  } catch (error) {
    res.json([]);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id }).populate(
      'owner',
      '_id, username'
    );

    return res.json(idea);
  } catch (err) {
    const error = new Error('Idea not found');
    error.statusCode = 404;
    error.errors = { message: 'No idea with that id found' };
    return next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    const user = User.findById(req.params.userId);
  } catch (error) {
    const err = new Error('User not found');
    err.statusCode = 404;
    err.errors = { message: 'No user with that id found' };
    return next(err);
  }

  try {
    const ideas = await Idea.find({ owner: user._id }).populate(
      'owner',
      '_id, username'
    );
    return res.json(ideas);
  } catch (error) {
    return res.json([]);
  }
});

router.post(
  '/',
  requireUser,
  validateIdeasInput,
  async (req, res, next) => {
    try {
      const newIdea = new Idea({
        owner: req.user._id,
        title: req.body.title,
        body: req.body.body,
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

      idea = await Idea.findById(req.params.id).populate(
        'owner',
        '_id, username'
      );

      return res.json(idea);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const idea = await Idea.findOneAndDelete({
      _id: req.params.id,
    });
    if (!idea) {
      const error = new Error('Idea not found');
      error.statusCode = 404;
      error.errors = { message: 'No idea with that id found' };
      return next(error);
    }
    if (idea.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = {
        message:
          'Only the owner of this idea is authorized to delete it.',
      };
      return next(error);
    }

    await idea.remove();
    return res.json(idea);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
