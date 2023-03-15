const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');

require('./models/User');
require('./models/Idea');
require('./models/Comment');
require('./config/passport');
const passport = require('passport');

const app = express();

if (!isProduction) app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);
// IMPORT FILE PATHS
const usersRouter = require('./routes/api/users');
const ideasRouter = require('./routes/api/ideas');
const commentsRouter = require('./routes/api/comments');
const csrfRouter = require('./routes/api/csrf');

// ADD EXPRESS ROUTERS
app.use('/api/users', usersRouter);
app.use('/api/ideas', ideasRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/csrf', csrfRouter);

// CATCH ALL UNMATCHED ROUTES AND FORMAT ERRORS/404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

module.exports = app;
