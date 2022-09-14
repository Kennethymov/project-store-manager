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
  const querySaleProducts = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)';
  await connection.execute(querySaleProducts, [id, product.productId, product.quantity]);
};

module.exports = {
  register,
  registerProduct,
  hasProduct,
};
