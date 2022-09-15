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

const getAll = async () => {
  const result = await saleModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await saleModel.getById(id);
  return result;
};

const remove = async (id) => {
  await saleModel.remove(id);
};

const update = async (id, saleUpdate) => {
  await Promise.all(saleUpdate.map(async (item) => {
    const hasProduct = await saleModel.hasProduct(item.productId);
    if (!hasProduct) {
      throw new Error('Product not found');
    }
  }));

  await Promise.all(saleUpdate.map(async (product) => {
    await saleModel.update(id, product);
  }));

  const saleUpdated = await saleModel.getById(id);
  console.log(saleUpdated);

  return {
    saleId: id,
    itemsUpdated: saleUpdated,
  };
};

module.exports = {
  register,
  getAll,
  getById,
  remove,
  update,
};