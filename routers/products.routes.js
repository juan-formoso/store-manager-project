const router = require('express').Router();

const { 
  nameValidation, 
  quantityValidation, 
  productAlreadyExists, 
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  productNotFound,
} = require('../controllers/products');

router.post('/', nameValidation, quantityValidation, productAlreadyExists, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', nameValidation, quantityValidation, productNotFound, updateProduct);

module.exports = router;
