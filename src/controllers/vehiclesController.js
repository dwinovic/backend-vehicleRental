const { response, srcResponse, srcFeature, pagination } = require('../helpers');
const uidshort = require('short-uuid');
// const redis = require('redis');
// const client = redis.createClient();
const fs = require('fs');

const {
  searchVehiclesModel,
  createNewVehicle,
  getAllVehicles,
  getItemVehicle,
  deleteVehicle,
  updateItemVehicle,
  filterLocationAndCategory,
} = require('../models/Vehicles');
const { createNewMedia } = require('../models/Media');
const filterFeature = require('../helpers/filterFeature');
const cloudinary = require('../middleware/cloudinary');

const uid = uidshort();

module.exports = {
  getAllVehicles: async (req, res, next) => {
    try {
      // filter location and category
      if (req.query.location || req.query.category) {
        filterFeature(req, res, next, filterLocationAndCategory).then(() => {
          // console.log(Object.keys(res.result));
          const { data, meta, error } = res.result;
          if (error.statusCode && error.message) {
            srcResponse(
              res,
              error.statusCode,
              meta,
              {},
              error.message,
              error.message
            );
          } else {
            srcResponse(res, 200, meta, data, {});
          }
        });
      }
      // PAGINATION
      if (!req.query.src) {
        const result = await pagination(req, res, next, getAllVehicles);
        // console.log(result);

        const {
          totalPage,
          currentPage,
          limit,
          totalData,
          data,
          error,
          sortBy,
        } = result;

        // START = HANDLE IMAGES
        // let imagesArrOfObj = []
        // data.forEach(item => {

        // })
        // END = HANDLE IMAGES

        const meta = {
          currentPage,
          totalData,
          limit,
          totalPage,
          sortBy,
        };
        // console.log(2, data.length);
        // return;
        if (data.length === 0) {
          // console.log(error);
          srcResponse(res, 404, meta, {}, error, error);
        } else {
          // SET CACHE IN REDIS
          // const setCache = { meta, data };
          // console.log(data);
          // client.setex('allproducts', 60 * 60, JSON.stringify(setCache));

          srcResponse(res, 200, meta, data);
        }
      }
      // SEARCHING
      if (req.query.src || req.query.type) {
        srcFeature(req, res, next, searchVehiclesModel).then(() => {
          // console.log(Object.keys(res.result));
          const { data, meta, error } = res.result;
          if (error.statusCode && error.message) {
            srcResponse(
              res,
              error.statusCode,
              meta,
              {},
              error.message,
              error.message
            );
          } else {
            // SET CACHE IN REDIS
            // const setCache = { meta, data };
            // client.setex('allproducts', 60 * 60, JSON.stringify(setCache));

            srcResponse(res, 200, meta, data, {});
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getItemVehicle: (req, res) => {
    // Request
    const id = req.params.id;
    // console.log(req.user);
    getItemVehicle(id)
      .then((result) => {
        if (result.length < 1) {
          response(res, 404, {}, {}, 'Vehicles Not Found!');
        }
        const vehicle = result[0];

        // START = HANDLE IMAGE
        const oldImages = vehicle.images.split(',');
        let newImages = [];
        oldImages.forEach((item) => {
          newImages.push(item);
        });
        // delete vehicle.images;
        const responseData = vehicle;
        responseData.images = newImages;
        // END = HANDLE IMAGE

        response(res, 200, responseData);
      })
      .catch((err) => {
        console.log(err);
        response(res, 500, {}, err);
      });
  },
  createNewVehicle: async (req, res) => {
    const {
      name,
      location,
      status,
      capacity,
      stock,
      category,
      description,
      price,
      paymentOption,
      likes,
      idOwner,
    } = req.body;
    const fileUpload = req.files;
    // console.log(fileUpload);

    // START = HANDLE UPLOAD WITHIN ONE TABLE VEHICLES
    let tmpImage = [];

    for (const file of fileUpload) {
      const { path } = file;
      tmpImage.push(path);
    }

    const imagesStr = await tmpImage.toString();
    // console.log('imagesStr', imagesStr);
    // END = HANDLE UPLOAD WITHIN ONE TABLE VEHICLES

    // UID
    const uuidVehicle = uid.generate();

    // Data to insert in DB

    const dataVehicle = {
      idVehicles: uuidVehicle,
      name,
      location,
      status,
      capacity,
      stock,
      category,
      description,
      price,
      paymentOption,
      likes,
      idOwner,
      images: imagesStr,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dataVehicle.idImages = dataVehicle.idVehicles;

    createNewVehicle(dataVehicle)
      .then(() => {
        const convertImageArray = dataVehicle.images.split(',');
        delete dataVehicle.images;
        dataVehicle.images = convertImageArray;
        response(res, 200, dataVehicle);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });

    // START = HANDLE UPLOAD IMAGE WITH RELATIONAL TABLE MEDIA

    // dataFilesRequest.forEach((item, index) => {
    //   const uuiImage = uid.generate();
    //   const fileName = item.filename;
    //   const imageUpload = {
    //     idImage: uuiImage,
    //     idOwner: dataVehicle.idVehicles,
    //     pathImage: fileName,
    //     type: index ? 0 : 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   createNewMedia(imageUpload);
    // });
    // END = HANDLE UPLOAD IMAGE WITH RELATIONAL TABLE MEDIA
  },
  updateVehicle: async (req, res) => {
    const id = req.params.id;

    // START = UPDATE LIKES VEHICLES
    if (req.body.likes) {
      const { likes } = req.body;
      const updateLikesVehicle = {
        likes: likes,
      };
      updateItemVehicle(id, updateLikesVehicle)
        .then(() => {
          const responseData = {
            idVehicles: id,
            updateLikes: likes,
          };
          response(res, 200, responseData);
        })
        .catch((err) => {
          response(res, 500, {}, err);
        });
      return;
    }
    // END = UPDATE LIKES VEHICLES

    // START = UPDATE DATA ALL VEHICLES

    const {
      name,
      location,
      status,
      capacity,
      stock,
      category,
      description,
      price,
      images,
    } = req.body;
    // console.log('images', images);
    const fileUpload = req.files;
    console.log('req.body', req.body);
    console.log('fileUpload', fileUpload);

    // START = HANDLE UPLOAD WITHIN ONE TABLE VEHICLES
    let tmpImage = [];

    if (fileUpload) {
      // fileUpload.forEach((item, index) => {
      //   tmpImage.push(`${process.env.HOST_SERVER}/files/${item.filename}`);
      // });
      for (const file of fileUpload) {
        const { path } = file;
        tmpImage.push(path);
      }
    }

    if (images) {
      // console.log('images', images);
      // images.forEach((item, index) => {
      //   if (item !== 'undefined' && item !== 'false') {
      //     tmpImage.push(item);
      //   }
      // });
      for (const image of images) {
        if (image !== 'undefined' && image !== 'false') {
          tmpImage.push(image);
        }
      }
    }

    let imagesStr = await tmpImage.toString();
    console.log('imagesStr', imagesStr);
    // END = HANDLE UPLOAD WITHIN ONE TABLE VEHICLES

    // Data UPDATE TO  DB
    const dataVehicle = {
      name,
      location,
      status,
      capacity,
      stock,
      category,
      description,
      price,
      updatedAt: new Date(),
    };

    if (images || fileUpload) {
      dataVehicle.images = imagesStr;
    }

    // GET OLD IMAGE NAME
    // let dataImageOld = await getItemVehicle(id)
    //   .then((result) => {
    //     const imageResponse = result[0].images;
    //     const imageArray = imageResponse.split(',');
    //     return imageArray;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // UPDATE PRODUCTS
    console.log('dataVehicle', dataVehicle);
    updateItemVehicle(id, dataVehicle)
      .then(() => {
        // Delete old images
        // dataImageOld.forEach(async (image) => {
        //   try {
        //     if (dataFilesRequest) {
        //       await fs.unlinkSync(`public/images/${image}`);
        //       console.log(`successfully deleted ${image}`);
        //     }
        //   } catch (error) {
        //     // console.error('there was an error:', error.message);
        //   }
        // });
        // const responseData = dataVehicle;
        // console.log('responseData', responseData);
        // const resImages = responseData.images.split(',');
        // responseData.images = resImages;
        response(res, 200, dataVehicle);
      })
      .catch((err) => {
        response(res, 500, {}, err);
      });

    // END = UPDATE DATA ALL VEHICLES
  },
  checkImageInput: async (req, res) => {
    try {
      const imageUpload = req.file;
      const nameImage = imageUpload.filename;
      await fs.unlinkSync(`public/images/${nameImage}`);
      console.log(`successfully deleted ${nameImage}`);
      response(res, 200, {}, {}, 'Image upload passed!');
    } catch (error) {
      // console.error('there was an error:', error.message);
    }
  },
  deleteVehicle: async (req, res, next) => {
    const id = req.params.id;

    const oldImages = await getItemVehicle(id)
      .then((result) => {
        const data = result[0].images.split(',');

        return data;
      })
      .catch(next);

    try {
      oldImages.forEach(async (item) => {
        await fs.unlinkSync(`public/images/${item}`);
        console.log(`successfully deleted ${item}`);
      });

      deleteVehicle(id)
        .then((result) => {
          if (result.affectedRows === 0) {
            response(res, 404, {}, {}, 'Item deleted not found!');
          }
          console.log('result delete:', result);
          response(res, 200, {}, {}, 'Success deleted vehicles');
        })
        .catch((err) => {
          response(res, 500, {}, err);
        });
    } catch (err) {
      console.error('there was an error:', err.message);
    }
  },
};
