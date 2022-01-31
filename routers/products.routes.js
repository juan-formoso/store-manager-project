const router = require('express').Router();

const { nameValidation, quantityValidation, createProduct } = require('../controllers/products');

router.post('/', nameValidation, quantityValidation, createProduct);

module.exports = router;
