const { response } = require('../helpers');
const category = require('../models/category');
const short = require('short-uuid');

const {
  createCategory,
  getAllCategory,
  getItemCategory,
  updateCategory,
  deleteCategory,
} = category;

module.exports = {
  createCategory: (req, res) => {
    // Request
    const { name } = req.body;
    // UUID
    const newUID = short.generate();
    const data = {
      idCategory: newUID,
      name,
    };
    // console.log(data);
    createCategory(data)
      .then(() => {
        response(res, 200, data);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getAllCategory: (req, res) => {
    getAllCategory()
      .then((result) => {
        response(res, 200, result);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  getItemCategory: (req, res) => {
    // BELUM BERFUNGSI
    const id = req.params.id;
    getItemCategory(id)
      .then((result) => {
        response(res, 200, result);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  updateCategory: (req, res) => {
    // BELUM BERFUNGSI

    // Request
    const { nameCategory } = req.body;
    const id = req.params.id;
    const dataFilesRequest = req.file;
    const image = dataFilesRequest.filename;

    const newData = { nameCategory, image, updatedAt: new Date() };
    updateCategory(id, newData)
      .then(() => {
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
  deleteCategory: (req, res) => {
    // BELUM BERFUNGSI

    const id = req.params.id;
    deleteCategory(id)
      .then(() => {
        response(res, 200);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });
  },
};
