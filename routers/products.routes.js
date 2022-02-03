const productRouter = require('express').Router();

const { 
  nameValidation, 
  quantityValidation, 
  productAlreadyExists, 
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  productNotFound,
  deleteProduct,
} = require('../controllers/products');

productRouter.post('/', nameValidation, quantityValidation, productAlreadyExists, createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', nameValidation, quantityValidation, productNotFound, updateProduct);
productRouter.delete('/:id', productNotFound, deleteProduct);

module.exports = productRouter;
