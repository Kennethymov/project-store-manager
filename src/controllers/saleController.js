const saleService = require('../services/saleService');

const register = async (req, res) => {
  try {
    const sale = req.body;
    const newSale = await saleService.register(sale);
    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  const result = await saleService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.getById(id);
  if (result.length === 0) { return res.status(404).json({ message: 'Sale not found' }); }
  return res.status(200).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const [sale] = await saleService.getById(id);
  if (!sale) { return res.status(404).json({ message: 'Sale not found' }); }
  await saleService.remove(id);
  return res.status(204).send();
};

module.exports = {
  register,
  getAll,
  getById,
  remove,
};