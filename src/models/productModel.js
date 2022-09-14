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

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [result] = await connection.execute(query, [name]);
  return result.insertId;
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  await connection.execute(query, [name, id]);
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};