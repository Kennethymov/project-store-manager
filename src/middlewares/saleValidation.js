const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().min(1).required(),
});

const saleValidation = async (req, res, next) => {
  const sale = req.body;
  const errors = [];
  await sale.forEach(async (item) => {
    const { error } = await saleSchema.validate(item);
    if (error) errors.push(error);    
  });
  if (errors.length > 0) {
    const errorCode = errors[0].details[0].type === 'any.required' ? 400 : 422;
    return res.status(errorCode).json({ message: errors[0].message });
  }
  console.log('passei');
  next();
};

module.exports = saleValidation;