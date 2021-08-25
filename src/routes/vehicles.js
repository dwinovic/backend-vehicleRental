const express = require('express');
const router = express.Router();
const { singleUpload, multipleUpload } = require('../middleware/multer');
const {
  getAllVehicles,
  checkImageInput,
  getItemVehicle,
  createNewVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehiclesController');
const { verifyAccess, sellerAccess } = require('../middleware/auth');

router
  .get('/', getAllVehicles)
  .post('/', verifyAccess, multipleUpload, createNewVehicle)
  .post('/images', verifyAccess, singleUpload, checkImageInput)
  .get('/:id', verifyAccess, getItemVehicle)
  .patch('/:id', verifyAccess, multipleUpload, updateVehicle)
  .delete('/:id', verifyAccess, deleteVehicle);

module.exports = router;
