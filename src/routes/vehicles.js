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
  .post('/', multipleUpload, createNewVehicle)
  .get('/:id', getItemVehicle)
  .patch('/:id', multipleUpload, updateVehicle)
  .delete('/:id', deleteVehicle);

module.exports = router;
