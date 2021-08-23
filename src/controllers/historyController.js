const { v4: uuidv4 } = require('uuid');
const { response, srcResponse, srcFeature, pagination } = require('../helpers');

const {
  getAllHistory,
  createHistory,
  updateTransaction,
  searchHistory,
  getItemHistory,
  deleteHistory,
} = require('../models/Histories');

module.exports = {
  getAllHistory: async (req, res, next) => {
    // Pagination data from middleware before
    try {
      if (!req.query.src) {
        // PAGINATION
        if (!req.query.src) {
          const result = await pagination(req, res, next, getAllHistory);
          // console.log(Object.keys(result));
          const {
            totalPage,
            currentPage,
            limit,
            totalData,
            data,
            error,
            sortBy,
          } = result;
          // console.log(data);

          // console.log(1, totalPage);

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
            srcResponse(res, 200, meta, data);
          }
        }
      }
      // SEARCHING
      // Belum selesai. BUG QUERY SQL
      if (req.query.src) {
        srcFeature(req, res, next, searchHistory).then(() => {
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
    } catch (error) {
      next(error);
    }

    // getAllTransaction()
    //   .then((result) => {
    //     const data = result;
    //     res.status(200).json(data);
    //   })
    //   .catch(next);
  },
  getItemHistory: (req, res) => {
    const idHistory = req.params.id;
    // console.log(idTransaction);
    getItemHistory(idHistory)
      .then((result) => {
        response(res, 200, result);
      })
      .catch((err) => {
        response(res, 404, {}, err);
      });
  },
  createHistory: (req, res, next) => {
    const { idReservation, idCustomer, idVehicles } = req.body;

    const data = {
      idHistory: uuidv4(),
      idReservation,
      idCustomer,
      idVehicles,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createHistory(data)
      .then(() => {
        response(res, 200, {}, {}, 'Success add transaction');
      })
      .catch(next);
  },
  updateItemTransaction: (req, res, next) => {
    const { quantity, idPayment, statusOrder } = req.body;
    const id = req.params.id;

    const updateItemTransaction = {
      idTransaction: id,
      quantity,
      id_payment: idPayment,
      statusOrder,
      updatedAt: new Date(),
    };

    updateTransaction(id, updateItemTransaction)
      .then(() => {
        // console.log(result);
        response(res, 200, {}, {}, 'Success updated transaction');
      })
      .catch(next);
  },
  deleteItemHistory: (req, res, next) => {
    const idHistory = req.params.id;
    deleteHistory(idHistory)
      .then((result) => {
        response(res, 200, {}, {}, 'Success deleted');
      })
      .catch((err) => {
        console.log(err);
        response(res, 501, {}, err.response, 'Failed to deleted');
      });
  },
};
