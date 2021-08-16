const express = require('express');
const router = express.Router();
const { uploadFile, multipleUpload } = require('../middleware/multer');
const {
  getAllVehicles,
  getItemVehicle,
  createNewVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehiclesController');
const { verifyAccess, sellerAccess } = require('../middleware/auth');

router
  .get('/', getAllVehicles)
  .post('/', verifyAccess, sellerAccess, multipleUpload, createNewVehicle)
  .get('/:id', verifyAccess, getItemVehicle)
  .patch('/:id', verifyAccess, sellerAccess, multipleUpload, updateVehicle)
  .delete('/:id', verifyAccess, sellerAccess, deleteVehicle);

module.exports = router;