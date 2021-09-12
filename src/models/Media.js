const querySQL = require('../helpers/querySql');

const createNewMedia = (data) => {
  return querySQL(`INSERT INTO media SET ?`, data);
};

module.exports = { createNewMedia };