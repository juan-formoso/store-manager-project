const salesRouter = require('express').Router();
const { 
  productIdValidation, 
  quantityValidation,
  createSale,
  getAllSales,
  getSaleById,
  saleNotFound,
} = require('../controllers/sales');

salesRouter.post('/', productIdValidation, quantityValidation, createSale);
salesRouter.get('/', getAllSales);
salesRouter.get('/id', saleNotFound, getSaleById);

module.exports = salesRouter;
