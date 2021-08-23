const express = require('express');
const routes = express();
const userRouter = require('./users');
const vehiclesRouter = require('./vehicles');
const categoryRouter = require('./category');
const reservationRouter = require('./reservation');
const historiesRouter = require('./histories');

routes
  .use('/users', userRouter)
  .use('/vehicles', vehiclesRouter)
  .use('/category', categoryRouter)
  .use('/reservations', reservationRouter)
  .use('/histories', historiesRouter);

module.exports = routes;
