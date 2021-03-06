const querySQL = require('../helpers/querySql');

const getAllVehicles = async (field, sortBy, limit, offset) => {
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
  const queryJoin = `SELECT vehicles.idVehicles, vehicles.name,  vehicles.location, vehicles.category AS 'idCategory', categories.name AS 'category', vehicles.status, vehicles.capacity, vehicles.images, vehicles.stock, vehicles.description, vehicles.price, vehicles.paymentOption, vehicles.likes, vehicles.idOwner, vehicles.createdAt, vehicles.updatedAt FROM vehicles JOIN categories ON (vehicles.category = categories.idCategory)`;

  const countDataInRows = await querySQL('SELECT COUNT(*) FROM vehicles');

  const countRows = parseInt(Object.values(countDataInRows[0]));

  const querySortLimitAndMore = `
  ORDER BY vehicles.${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}
  `;

  const queryAll = await querySQL(`${queryJoin}  ${querySortLimitAndMore}`);

  return { countRows, result: queryAll };
};

const getItemVehicle = (id) => {
  const queryJoin = `SELECT vehicles.idVehicles, vehicles.name,  vehicles.location, vehicles.category AS 'idCategory', categories.name AS 'category', vehicles.status, vehicles.capacity, vehicles.images, vehicles.stock, vehicles.description, vehicles.price, vehicles.paymentOption, vehicles.likes, vehicles.idOwner, vehicles.createdAt, vehicles.updatedAt FROM vehicles JOIN categories ON (vehicles.category = categories.idCategory)`;

  return querySQL(`${queryJoin} WHERE vehicles.idVehicles = '${id}'`);
};

const createNewVehicle = (data) => {
  return querySQL(`INSERT INTO vehicles SET ?`, data);
};

const updateItemVehicle = (id, data) => {
  return querySQL('UPDATE vehicles SET ? WHERE idVehicles = ?', [data, id]);
};

const searchVehiclesModel = async (
  value,
  limit,
  table,
  field,
  sortBy,
  offset,
  category
) => {
  // console.log(value, limit, table, field, sortBy);
  // check result count searching

  // IN NATURAL LANGUAGE MODE
  // WITH QUERY EXPANSION

  // `SELECT COUNT(*) from ${table} WHERE MATCH(nameProduct, description) AGAINST(${value} WITH QUERY EXPANSION)`

  const getCountRows = await querySQL(
    `SELECT COUNT(*) FROM vehicles JOIN categories ON (vehicles.category = categories.idCategory) WHERE vehicles.name LIKE '%${value}%' OR categories.name LIKE '%${value}'`
  );

  // console.log(getCountRows);
  const dataCountRows = getCountRows[0];
  const numDataCountRows = Object.values(dataCountRows)[0];
  // console.log(numDataCountRows);
  // console.log(typeof offset);

  // const queryByCategory = `WHERE category.nameCategory LIKE '%${category}%'`;
  const querySearching = `WHERE vehicles.name LIKE '%${value}%' OR categories.name LIKE '%${value}%'`;

  const limitResult = await querySQL(
    `SELECT vehicles.idVehicles, vehicles.name,  vehicles.location, categories.name, vehicles.status, vehicles.capacity, vehicles.stock, vehicles.category, vehicles.description, vehicles.price, vehicles.paymentOption, vehicles.likes, vehicles.images, vehicles.idOwner, vehicles.createdAt, vehicles.updatedAt FROM vehicles JOIN categories ON (vehicles.category = categories.idCategory) ${querySearching} ORDER BY ${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}`
  );
  // console.log('limitResult', limitResult);

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
  // console.log('limitResult', limitResult);

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
};
const filterLocationAndCategory = async (
  valueLocation,
  valueCategory,
  limit,
  table,
  field,
  sortBy,
  offset,
  category
) => {
  // console.log(value, limit, table, field, sortBy);
  // check result count searching

  // IN NATURAL LANGUAGE MODE
  // WITH QUERY EXPANSION

  // `SELECT COUNT(*) from ${table} WHERE MATCH(nameProduct, description) AGAINST(${value} WITH QUERY EXPANSION)`

  const getCountRows = await querySQL(
    `SELECT COUNT(*) FROM vehicles JOIN categories ON (vehicles.category = categories.idCategory) WHERE vehicles.location LIKE '%${valueLocation}%' AND categories.name LIKE '%${valueCategory}'`
  );
  // console.log(getCountRows);
  const dataCountRows = getCountRows[0];
  const numDataCountRows = Object.values(dataCountRows)[0];
  // console.log(numDataCountRows);
  // console.log(typeof offset);

  // const queryByCategory = `WHERE category.nameCategory LIKE '%${category}%'`;
  const querySearching = `WHERE vehicles.location LIKE '%${valueLocation}%' AND categories.name LIKE '%${valueCategory}%'`;

  const limitResult = await querySQL(
    `SELECT vehicles.idVehicles, vehicles.name,  vehicles.location, categories.name AS 'category', vehicles.status, vehicles.images, vehicles.capacity, vehicles.stock, vehicles.category AS 'idCategory', vehicles.description, vehicles.price, vehicles.paymentOption, vehicles.likes, vehicles.idOwner, vehicles.createdAt, vehicles.updatedAt FROM vehicles JOIN categories ON (vehicles.category = categories.idCategory) ${querySearching} ORDER BY ${field} ${sortBy} LIMIT ${limit} OFFSET ${offset}`
  );
  // console.log('limitResult', limitResult);

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
  console.log('limitResult', limitResult);

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
  searchVehiclesModel,
  filterLocationAndCategory,
};
