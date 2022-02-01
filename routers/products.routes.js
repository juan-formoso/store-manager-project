const router = require('express').Router();

const { 
  nameValidation, 
  quantityValidation, 
  productAlreadyExists, 
  createProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/products');

router.post('/', nameValidation, quantityValidation, productAlreadyExists, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
