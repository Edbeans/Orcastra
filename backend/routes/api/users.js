const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const {
  singleFileUpload,
  singleMulterUpload,
} = require('../../awsS3');

const DEFAULT_PROFILE_IMAGE_URL =
  'https://ey-aws-mern-orcastra.s3.us-west-1.amazonaws.com/public/default-profile-picture.png';

router.get('/', function (req, res, next) {
  res.json({
    message: 'GET /api/users',
  });
});

router.post(
  '/register',
  singleMulterUpload('image'),
  validateRegisterInput,
  async (req, res, next) => {
    const standardizedUsername = req.body.username.toLowerCase();
    const standardizedEmail = req.body.email.toLowerCase();

    const user = await User.findOne({
      $or: [
        { email: standardizedEmail },
        { username: standardizedUsername },
      ],
    });

    if (user) {
      const err = new Error('Validation Error');
      err.statusCode = 400;
      const errors = {};
      if (user.email.toLowerCase() === standardizedEmail) {
        errors.email =
          'A user has already registered with this email';
      }
      if (user.username.toLowerCase() === standardizedUsername) {
        errors.username =
          'A user has already registered with this username';
      }
      err.errors = errors;
      return next(err);
    }

    const profileImageUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : DEFAULT_PROFILE_IMAGE_URL;
    const newUser = new User({
      username: standardizedUsername,
      profileImageUrl,
      email: standardizedEmail,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(
        req.body.password,
        salt,
        async (err, hashedPassword) => {
          if (err) throw err;
          try {
            newUser.hashedPassword = hashedPassword;
            const user = await newUser.save();
            return res.json(await loginUser(user));
          } catch (err) {
            next(err);
          }
        }
      );
    });
  }
);

router.post(
  '/login',
  singleMulterUpload(''),
  validateLoginInput,
  async (req, res, next) => {
    passport.authenticate('local', async function (err, user) {
      if (err) return next(err);
      if (!user) {
        const err = new Error('Invalid credentials');
        err.statusCode = 400;
        err.errors = { email: 'Invalid credentials' };
        return next(err);
      }
      return res.json(await loginUser(user));
    })(req, res, next);
  }
);

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie('CSRF-TOKEN', csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email,
    ideas: req.user.ideas,
    bids: req.user.bids,
    comments: req.user.comments,
  });
});

router.get('/:id', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id)
      .populate('comments')
      .populate('bids');
    return res.json(user);
  } catch (error) {
    const err = new Error('No user with that id found');
    err.statusCode = 422;
    err.errors = { message: 'No user with that id found' };
    return next(err);
  }
});

module.exports = router;
