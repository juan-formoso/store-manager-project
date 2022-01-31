const { Router } = require('express');

const router = Router();
const { nameValidation, quantityValidation, createProduct } = require('../controllers/products');

router.post('/', nameValidation, quantityValidation, createProduct);

module.export = { router };
