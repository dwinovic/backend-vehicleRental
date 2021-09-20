const { querySQL } = require('../helpers');

module.exports = {
  getAllReservation: () => {
    return querySQL('SELECT * FROM reservations');
  },
  getItemReservation: (id) => {
    return querySQL(
      `SELECT reservations.idReservation, reservations.idVehicles, reservations.reservationStartDate, reservations.reservationEndDate, reservations.reservationQty, reservations.priceTotal, reservations.status,reservations.payment_method, users.name AS username, users.email, vehicles.name AS vehicleName,  vehicles.images, vehicles.price,  vehicles.location, reservations.updatedAt   FROM reservations INNER JOIN users ON reservations.idCustomer = users.idUser INNER JOIN vehicles ON reservations.idVehicles = vehicles.idVehicles WHERE reservations.idReservation = '${id}';`
    );
  },
  getHistoryReservation: (id, role) => {
    const queryUser = role === 'admin' ? 'vehicles.idOwner' : 'users.idUser';
    return querySQL(
      `SELECT reservations.idReservation, reservations.idVehicles, reservations.reservationStartDate, reservations.reservationEndDate, reservations.reservationQty, reservations.priceTotal, reservations.status, users.name AS username, users.email, vehicles.name AS vehicleName,  vehicles.images, vehicles.price,  vehicles.location, reservations.updatedAt   FROM reservations INNER JOIN users ON reservations.idCustomer = users.idUser INNER JOIN vehicles ON reservations.idVehicles = vehicles.idVehicles WHERE ${queryUser} = '${id}';`
    );
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
    return querySQL('DELETE FROM reservations WHERE idReservation = ?', id);
  },
};
