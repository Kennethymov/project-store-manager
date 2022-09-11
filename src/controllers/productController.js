const productService = require('../services/productService');

const getAll = async (req, res) => {
  const result = await productService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [result] = await productService.getById(id);
  console.log(result);
  if (!result) { return res.status(404).json({ message: 'Product not found' }); }  
  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};