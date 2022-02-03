const salesRouter = require('express').Router();
const { idValidation, quantityValidation, createSale } = require('../controllers/sales');

salesRouter.post('/', idValidation, quantityValidation, createSale);

module.exports = salesRouter;
