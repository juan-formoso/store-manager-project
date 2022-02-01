const router = require('express').Router();

const { 
  nameValidation, 
  quantityValidation, 
  productAlreadyExists, 
  createProduct,
} = require('../controllers/products');

router.post('/', nameValidation, quantityValidation, productAlreadyExists, createProduct);

module.exports = router;
