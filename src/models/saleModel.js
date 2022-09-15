const { connection } = require('./connection');

const register = async () => {
  const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [result] = await connection.execute(querySale);
  return result.insertId;
};

const hasProduct = async (id) => {
  const query = `SELECT * FROM StoreManager.products WHERE id = ${id}`;
  const result = await connection.query(query);
  return result[0].length > 0;
};

const registerProduct = async (id, product) => {
  const querySaleProducts = 'INSERT INTO StoreManager.sales_products'
    + '(sale_id, product_id, quantity) VALUES(?, ?, ?)';
  await connection.execute(querySaleProducts, [id, product.productId, product.quantity]);
};

const getAll = async () => {
  const query = 'SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM StoreManager.sales AS s '
    + 'JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id '
    + 'ORDER BY sale_id, product_id;';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM StoreManager.sales AS s '
    + 'JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id '
    + `WHERE sale_id = ${id};`;
  const [result] = await connection.execute(query);
  return result;
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [id]);
};

const update = async (id, product) => {
  const query = 'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;';
  await connection.execute(query, [product.quantity, id, product.productId]);
};

module.exports = {
  register,
  registerProduct,
  hasProduct,
  getAll,
  getById,
  remove,
  update,
};
