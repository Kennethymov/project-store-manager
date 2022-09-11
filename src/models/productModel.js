const { connection } = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT * FROM StoreManager.products WHERE id = ${id};`;
  const [result] = await connection.execute(query);
  return result;
};

module.exports = {
  getAll,
  getById,
};