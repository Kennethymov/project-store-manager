const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const { error } = productSchema.validate({ name });
  if (error) {
    const errorCode = error.details[0].type === 'string.min' ? 422 : 400;
    return res.status(errorCode).json({ message: error.message });
  }
  next();
};

module.exports = nameValidation;