const { querySQL } = require('../helpers');

module.exports = {
  getAllReservation: () => {
    return querySQL('SELECT * FROM reservations');
  },
  getItemReservation: (id) => {
    return querySQL('SELECT * FROM reservations WHERE idReservation = ?', id);
  },
  createReservation: (data) => {
    return querySQL('INSERT INTO reservations SET ?', data);
  },
  updateReservation: (id, data) => {
    return querySQL('UPDATE reservations SET ? WHERE idReservation = ?', [
      data,
      id,
    ]);
  },
  deleteMethodPayment: (id) => {
    return querySQL('DELETE FROM reservations WHERE id = ?', id);
  },
};
