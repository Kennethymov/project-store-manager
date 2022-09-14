const saleModel = require('../models/saleModel');

const register = async (sale) => {
  await Promise.all(sale.map(async (product) => {
    const hasProduct = await saleModel.hasProduct(product.productId);
    if (!hasProduct) {
      throw new Error('Product not found');
    }
  }));
  
  const id = await saleModel.register();
  sale.map(async (product) => {
    await saleModel.registerProduct(id, product);
  });
  
  return {
    id,
    itemsSold: sale,
  };
};

module.exports = {
  register,
};