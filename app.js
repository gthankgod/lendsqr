require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const env = process.env.NODE_ENV || 'staging';
const db = require('./db');

// Connect to DB
db('mysql', env);

const routes = require('./routes/index');
const responseHandler = require("./utils/responseHandler");
// const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', routes);

// Catch all exceptions thrown from app
app.use((req, res, next) => {
  responseHandler(res);
  next()
})

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
