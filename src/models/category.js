const { querySQL } = require('../helpers');
module.exports = {
  createCategory: (data) => {
    return querySQL('INSERT INTO categories SET ?', data);
  },
  getAllCategory: () => {
    return querySQL('SELECT * FROM categories');
  },
  getItemCategory: (id) => {
    return querySQL('SELECT * FROM category WHERE id = ?', id);
  },
  updateCategory: (id, data) => {
    return querySQL('UPDATE category SET ? WHERE id = ?', [data, id]);
  },
  deleteCategory: (id) => {
    return querySQL('DELETE FROM category WHERE id = ?', id);
  },
};
