const { querySQL } = require('../helpers');

module.exports = {
  getAllHistory: async (field, sortBy, limit, offset, idCustomer) => {
    const queryJoinAllHistory = `SELECT histories.idHistory, histories.idReservation AS 'idReservation', histories.idCustomer AS 'idCustomer', histories.idVehicles, vehicles.name AS 'nameVehicle', vehicles.location, vehicles.price, vehicles.paymentOption, reservations.reservationStartDate, reservations.reservationEndDate, reservations.reservationQty, reservations.priceTotal, reservations.status, vehicles.images, histories.createdAt, histories.updatedAt FROM histories INNER JOIN reservations ON histories.idReservation = reservations.idReservation INNER JOIN users ON histories.idCustomer = users.idUser INNER JOIN vehicles ON histories.idVehicles = vehicles.idVehicles WHERE histories.idCustomer = '${idCustomer}'`;

    const countDataInRows = await querySQL(`SELECT COUNT(*) FROM histories WHERE
    idCustomer = '${idCustomer}'`);

    const countRows = parseInt(Object.values(countDataInRows[0])); // 12

    // value = value || '';
    // field = field || 'updatedAt';
    // sortBy = sortBy || 'DESC';
    // limit = limit || countRows < limit ? 8 : countRows;
    // offset = offset || 0;

    const sortLimitAndMore = `
     ORDER BY histories.updatedAt ${sortBy} LIMIT ${limit} OFFSET ${offset}
    `;

    const joinDataTransaction = await querySQL(
      `${queryJoinAllHistory} ${sortLimitAndMore}`
    );

    console.log('joinDataTransaction', joinDataTransaction);

    // console.log(sortLimitAndMore);
    return { countRows, result: joinDataTransaction };
  },
  getItemHistory: (idTransaction) => {
    return querySQL(
      `SELECT * FROM histories WHERE idTransaction = '${idTransaction}'`
    );
  },
  createHistory: (data) => {
    return querySQL('INSERT INTO histories SET ?', data);
  },
  updateTransaction: (id, data) => {
    return querySQL('UPDATE histories SET ? WHERE idTransaction = ?', [
      data,
      id,
    ]);
  },
  deleteHistory: (id) => {
    return querySQL(`DELETE FROM histories WHERE idHistory = '${id}'`);
  },
  searchHistory: async (
    value,
    limit,
    table,
    field,
    sortBy,
    offset,
    idCustomer
  ) => {
    // console.log(value, limit, table, field, sortBy);
    // check result count searching

    // IN NATURAL LANGUAGE MODE
    // WITH QUERY EXPANSION

    // `SELECT COUNT(*) from ${table} WHERE MATCH(nameProduct, description) AGAINST(${value} WITH QUERY EXPANSION)`

    const getCountRows = await querySQL(
      `SELECT COUNT(*) FROM histories INNER JOIN reservations ON histories.idReservation = reservations.idReservation INNER JOIN users ON histories.idCustomer = users.idUser INNER JOIN vehicles ON histories.idVehicles = vehicles.idVehicles WHERE histories.idCustomer = '${idCustomer}' OR vehicles.name LIKE '%${value}%' OR vehicles.location LIKE '%${value}%'`
    );
    // console.log(getCountRows);
    const dataCountRows = getCountRows[0];
    const numDataCountRows = Object.values(dataCountRows)[0];
    // console.log(numDataCountRows);
    // console.log(typeof offset);

    const limitResult =
      await querySQL(`SELECT histories.idHistory, histories.idReservation AS 'idReservation', histories.idCustomer AS 'idCustomer', histories.idVehicles, vehicles.name AS 'nameVehicle', vehicles.location, vehicles.price, vehicles.paymentOption, reservations.reservationStartDate, reservations.reservationEndDate, reservations.reservationQty, reservations.priceTotal, reservations.status, vehicles.images, histories.createdAt, histories.updatedAt FROM histories INNER JOIN reservations ON histories.idReservation = reservations.idReservation INNER JOIN users ON histories.idCustomer = users.idUser INNER JOIN vehicles ON histories.idVehicles = vehicles.idVehicles WHERE histories.idCustomer = '${idCustomer}' OR vehicles.name
        LIKE '%${value}%' OR vehicles.location LIKE '%${value}%' ORDER BY ${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}`);

    // console.log(limitResult);
    // return;
    // totalPage
    const totalPageBefore = numDataCountRows / limit; // 2.374
    const convertMin = parseInt(totalPageBefore.toFixed(0)); // 2
    const convertMax = parseInt(totalPageBefore.toFixed(1)); // 2.3
    let totalPageAfter;

    if (convertMin < convertMax) {
      totalPageAfter = parseInt(convertMin) + 1;
    } else {
      totalPageAfter = parseInt(convertMin);
    }
    // console.log(totalPageAfter);

    // console.log(1, totalPageBefore);
    // console.log(2, convertMin);
    // console.log(3, convertMax);
    // console.log(4, totalPageAfter);

    const dataResponse = {
      totalData: numDataCountRows,
      limit: numDataCountRows > limit ? limit : numDataCountRows,
      totalPage: totalPageAfter,
      data: limitResult,
    };

    // console.log(limitResult.length);
    if (limitResult.length === 0) {
      dataResponse.statusCode = 404;
      dataResponse.errorMessage = 'Page not found';
    }
    return dataResponse;
  },
};
