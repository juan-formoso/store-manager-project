const salesRouter = require('express').Router();
const { 
  productIdValidation, 
  quantityValidation,
  createSale,
  getAllSales,
  getSaleById,
} = require('../controllers/sales');

salesRouter.post('/', productIdValidation, quantityValidation, createSale);
salesRouter.get('/', getAllSales);
salesRouter.get('/id', getSaleById);

module.exports = salesRouter;
