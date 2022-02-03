/* const salesRouter = require('express').Router();
const { idValidation, quantityValidation, createSale } = require('../controllers/sales');

salesRouter.post('/', idValidation, quantityValidation, createSale);

module.exports = salesRouter;
 */

const salesRouter = require('express').Router();
const { 
  productIdValidation, 
  quantityValidation,
  createSale,
} = require('../controllers/sales');

salesRouter.post('/', productIdValidation, quantityValidation, createSale);

module.exports = salesRouter;