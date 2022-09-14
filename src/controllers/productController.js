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

const create = async (req, res) => {
    const { name } = req.body;
    const newProduct = await productService.create(name);
    return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const [product] = await productService.getById(id);
  if (!product) { return res.status(404).json({ message: 'Product not found' }); }
  const [productUpdated] = await productService.update(id, name);
  return res.status(200).json(productUpdated);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const [product] = await productService.getById(id);
  if (!product) { return res.status(404).json({ message: 'Product not found' }); }
  await productService.remove(id);
  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};