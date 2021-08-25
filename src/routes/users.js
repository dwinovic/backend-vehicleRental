const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { verifyAccess } = require('../middleware/auth');
const { singleUpload } = require('../middleware/multer');

router
  .get('/', userController.getAllUsers)
  .get('/verify-token', verifyAccess, userController.verifyTokenUser)
  .post('/register', userController.createUser)
  .post('/login', userController.loginUser)
  .get('/logout', userController.logout)
  .post('/forgot-password', userController.getUserByEmail)
  .patch('/change-password/:id', userController.updatePassword)
  .get('/:id', verifyAccess, userController.getUserId)
  .patch('/:id', verifyAccess, singleUpload, userController.updateUser)

  .delete('/:id', userController.deleteUser);

module.exports = router;
