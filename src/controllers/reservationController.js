const { response } = require('../helpers');
const ReservationModel = require('../models/Reservation');
const uidshort = require('short-uuid');

const {
  getAllReservation,
  getItemReservation,
  createReservation,
  updateReservation,
  deleteMethodPayment,
} = ReservationModel;

const uid = uidshort();

module.exports = {
  getAllReservation: (req, res) => {
    getAllReservation()
      .then((result) => {
        const data = result;
        // console.log();
        response(res, 200, data, {}, 'Success get all method payments');
      })
      .catch((err) => {
        // console.log(err);
        response(res, 500, {}, err, 'Error to get all method payments');
      });
  },
  getItemReservation: (req, res) => {
    const id = req.params.id;
    getItemReservation(id)
      .then((result) => {
        const data = result;
        response(res, 200, data, {}, 'Success get method item');
      })
      .catch((err) => {
        response(res, 500, {}, err, 'Error get method item');
      });
  },
  createReservation: (req, res) => {
    const {
      idVehicles,
      idCustomer,
      // nameVehicles,
      // location,
      // priceItem,
      // paymentOption,
      reservationStartDate,
      reservationEndDate,
      reservationQty,
      priceTotal,
      status,
    } = req.body;

    const idReservation = uid.generate();

    const dataSend = {
      idReservation: idReservation,
      idVehicles,
      idCustomer,
      reservationStartDate,
      reservationEndDate,
      reservationQty,
      priceTotal,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createReservation(dataSend)
      .then(() => {
        // console.log(result);
        response(res, 200, dataSend, {}, `Success created reservation`);
      })
      .catch((err) => {
        response(res, 500, {}, err, `Failed to created method ${dataSend}`);
      });
  },
  updateReservation: (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    const data = {
      status,
      updatedAt: new Date(),
    };
    updateReservation(id, data)
      .then(() => {
        // console.log(result);
        response(res, 200, {}, {}, `Success update reservation`);
      })
      .catch((err) => {
        // console.log(err);
        response(res, 500, {}, err, `Failed to update reservation`);
      });
  },
  deleteMethodItem: (req, res) => {
    const id = req.params.id;
    deleteMethodPayment(id)
      .then(() => {
        // console.log(result);
        response(res, 200, {}, {}, 'Deleted success');
      })
      .catch((err) => {
        response(res, 500, {}, err, 'Failed to delete!');
      });
  },
};
