const express = require('express');
const routes = express();
const userRouter = require('./users');
const vehiclesRouter = require('./vehicles');
const categoryRouter = require('./category');
const paymentRouter = require('./payments');
const transactionRouter = require('./transaction');

routes
  .use('/users', userRouter)
  .use('/vehicles', vehiclesRouter)
  .use('/category', categoryRouter)
  .use('/payments', paymentRouter)
  .use('/transactions', transactionRouter);

module.exports = routes;