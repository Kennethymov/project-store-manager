const express = require('express');
const productController = require('../controllers/productController');
const nameValidation = require('../middlewares/nameValidation');

const productRoute = express.Router();

productRoute.get('/', productController.getAll);

productRoute.get('/:id', productController.getById);

productRoute.post('/', nameValidation, productController.create);

module.exports = productRoute;