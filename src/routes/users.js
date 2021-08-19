const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { verifyAccess } = require('../middleware/auth');
const { singleUpload } = require('../middleware/multer');

router
  .get('/', userController.getAllUsers)
  .get('/verify-token', userController.verifyTokenUser)
  .post('/register', userController.createUser)
  .post('/login', userController.loginUser)
  .post('/forgot-password', userController.getUserByEmail)
  .patch('/change-password/:id', userController.updatePassword)
  .get('/:id', userController.getUserId)
  .patch('/:id', singleUpload, userController.updateUser)

  .delete('/:id', userController.deleteUser);

module.exports = router;
