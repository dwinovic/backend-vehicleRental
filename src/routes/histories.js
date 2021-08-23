const express = require('express');
const {
  createHistory,
  getAllHistory,
  updateItemTransaction,
  getItemHistory,
  deleteItemHistory,
} = require('../controllers/historyController');
const { verifyAccess, sellerAccess } = require('../middleware/auth');
const router = express.Router();

router
  .post('/', createHistory)
  .get('/:id', getAllHistory)
  .post('/:id', updateItemTransaction)
  .delete('/:id', deleteItemHistory);

module.exports = router;
