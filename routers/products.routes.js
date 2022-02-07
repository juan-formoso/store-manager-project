const productRouter = require('express').Router();

const { 
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteById,
} = require('../controllers/products');

const { 
  nameValidation,
  nameSize,
  quantityValidation,
  quantityIsInteger,
  uniqueName,
  idValidation,
} = require('../helpers/products');

productRouter.post(
  '/', 
  nameValidation, 
  nameSize, 
  quantityValidation, 
  quantityIsInteger, 
  uniqueName, 
  createProduct,
);

productRouter.get('/', getAll);

productRouter.get('/:id', getById);

productRouter.put(
  '/:id', 
  idValidation, 
  nameValidation, 
  nameSize, 
  quantityValidation, 
  quantityIsInteger, 
  updateProduct,
);

productRouter.delete('/:id', idValidation, deleteById);

module.exports = productRouter;
