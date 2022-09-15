const productModel = require('../models/productModel');

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  return result;
};

const create = async (name) => {
  const id = await productModel.create(name);
  return { id, name };
};

const update = async (id, name) => {
  await productModel.update(id, name);
  const product = await productModel.getById(id);
  return product;
};

const remove = async (id) => {
  await productModel.remove(id);
};

const search = async (q) => {
  const products = await productModel.getAll();
  const result = products.filter((product) => product.name.includes(q));
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  search,
};