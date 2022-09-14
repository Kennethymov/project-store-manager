const saleModel = require('../services/saleService');

const register = async (req, res) => {
  try {
    const sale = req.body;
    const newSale = await saleModel.register(sale);
    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  register,
};