const salesRouter = require('express').Router();

const { 
  createSale,
  getAll,
  getById,
  updateSale,
  deleteById,
} = require('../controllers/sales');

const { 
  productIdValidation,
  salesQuantityValidation,
  quantityIsNumber,
  amountValidation,
} = require('../helpers/sales');

salesRouter.post(
  '/', 
  productIdValidation, 
  salesQuantityValidation, 
  quantityIsNumber, 
  amountValidation, 
  createSale,
);

salesRouter.get('/', getAll);

salesRouter.get('/:id', getById);

salesRouter.put('/:id', productIdValidation, salesQuantityValidation, quantityIsNumber, updateSale);

salesRouter.delete('/:id', deleteById);

/* app.route('/sales')
  .post(
    productIdExists,
    quantitySalesExists,
    validQuantityIsNumber,
    checkQuantity,
    salesController.create,
  );

app.route('/sales')
  .get(salesController.getAll);

app.route('/sales/:id')
  .get(salesController.getById)
  .put(
    productIdExists,
    quantitySalesExists,
    validQuantityIsNumber,
    salesController.update,
  )
  .delete(salesController.deleteById); */

module.exports = salesRouter;
