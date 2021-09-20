const { response } = require('../helpers');
const ReservationModel = require('../models/Reservation');
const uidshort = require('short-uuid');
const { getHistoryReservation } = require('../models/Reservation');

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
    console.log(id);
    getItemReservation(id)
      .then((result) => {
        const data = result;
        // console.log('data', data);
        response(res, 200, data, {}, 'Success get method item');
      })
      .catch((err) => {
        response(res, 500, {}, err, 'Error get method item');
      });
  },
  getHistoryReservation: (req, res) => {
    const id = req.params.id;
    const { role } = req.body;
    console.log('role', role);
    getHistoryReservation(id, role)
      .then((result) => {
        const data = result;
        // console.log('data', data);
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
      reservationStartDate: new Date(reservationStartDate),
      reservationEndDate: new Date(reservationEndDate),
      reservationQty,
      priceTotal,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('dataSend', dataSend);
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
    const { status, payment_method } = req.body;

    const id = req.params.id;

    const data = {
      status,
      payment_method,
      updatedAt: new Date(),
    };

    updateReservation(id, data)
      .then((result) => {
        console.log(result);
        response(res, 200, {}, {}, `Success update reservation`);
      })
      .catch((err) => {
        console.log(err);
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
