const express = require('express');
const categoryController = require('../controllers/categoryController');
const { verifyAccess, superAccess } = require('../middleware/auth');
const router = express.Router();

const {
  createCategory,
  getAllCategory,
  getItemCategory,
  updateCategory,
  deleteCategory,
} = categoryController;

router
  .get('/', getAllCategory)
  .post('/', createCategory)
  .get('/:id', verifyAccess, superAccess, getItemCategory)
  .post('/:id', updateCategory)
  .delete('/:id', deleteCategory);

module.exports = router;
