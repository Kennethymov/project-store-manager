const express = require('express');
const saleController = require('../controllers/saleController');
const saleValidation = require('../middlewares/saleValidation');

const saleRoute = express.Router();

saleRoute.post('/', saleValidation, saleController.register);

module.exports = saleRoute;