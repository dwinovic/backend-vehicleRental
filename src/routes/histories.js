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
  .post('/', verifyAccess, createHistory)
  .get('/:id', verifyAccess, getAllHistory)
  .post('/:id', verifyAccess, updateItemTransaction)
  .delete('/:id', verifyAccess, deleteItemHistory);

module.exports = router;
