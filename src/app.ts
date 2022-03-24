import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';

import indexRouter from './staticrouter/index';
import usersRouter from './user/user.router';
import trmsRouter from './trms/trms.router';
import publicDir from './constant';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDir));
app.use(
  session({
    secret: 'donotgiveup',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new (MemoryStore(session))({
      checkPeriod: 86400000,
    }),
  })
);

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/trms', trmsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile('error.html', { root: publicDir });
});

module.exports = app;
