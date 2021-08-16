const querySQL = require('../helpers/querySql');

const getAllVehicles = async(field, sortBy, limit, offset) => {
  // const queryJoin = `SELECT
  //   vehicles.idVehicles,
  //   vehicles.name,
  //   vehicles.location,
  //   vehicles.idImages,
  //   media.pathImage,
  //   media.type,
  //   vehicles.status,
  //   vehicles.capacity,
  //   vehicles.stock,
  //   vehicles.type,
  //   vehicles.description,
  //   vehicles.price,
  //   vehicles.paymentOption,
  //   vehicles.likes,
  //   vehicles.createdAt,
  //   vehicles.updatedAt,
  //   vehicles.likes,
  // FROM vehicles
  //   INNER JOIN media
  //     ON vehicles.idImages=media.idOwner`;
  const queryJoin = `SELECT * FROM vehicles`;

  const countDataInRows = await querySQL('SELECT COUNT(*) FROM vehicles');

  const countRows = parseInt(Object.values(countDataInRows[0]));

  const querySortLimitAndMore = `
  ORDER BY vehicles.${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}
  `;

  const queryAll = await querySQL(`${queryJoin}  ${querySortLimitAndMore}`);

  return { countRows, result: queryAll };
};

const getItemVehicle = (id) => {
  const queryJoin = `SELECT * FROM vehicles`;

  return querySQL(`${queryJoin} WHERE idVehicles = '${id}'`);
};

const createNewVehicle = (data) => {
  return querySQL(`INSERT INTO vehicles SET ?`, data);
};

const updateItemVehicle = (id, data) => {
  return querySQL('UPDATE vehicles SET ? WHERE idVehicles = ?', [data, id]);
};

const deleteVehicle = (id) => {
  return querySQL('DELETE FROM vehicles WHERE idVehicles = ?', id);
};

module.exports = {
  createNewVehicle,
  getAllVehicles,
  getItemVehicle,
  deleteVehicle,
  updateItemVehicle,
};