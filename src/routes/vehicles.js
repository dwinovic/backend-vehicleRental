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
  .post('/', multipleUpload, createNewVehicle)
  .post('/images', singleUpload, checkImageInput)
  .get('/:id', getItemVehicle)
  .patch('/:id', multipleUpload, updateVehicle)
  .delete('/:id', deleteVehicle);

module.exports = router;
