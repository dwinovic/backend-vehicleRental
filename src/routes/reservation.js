const express = require('express');
const {
  createReservation,
  getAllReservation,
  getItemReservation,
  updateReservation,
  deleteMethodItem,
} = require('../controllers/reservationController');

const router = express.Router();
router
  .get('/', getAllReservation)
  .post('/', createReservation)
  .get('/:id', getItemReservation)
  .patch('/:id', updateReservation)
  .delete('/:id', deleteMethodItem);

module.exports = router;
