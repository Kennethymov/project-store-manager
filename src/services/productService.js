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

module.exports = {
  getAll,
  getById,
  create,
};