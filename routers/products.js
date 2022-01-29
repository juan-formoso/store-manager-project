const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');

router.post('/', productsController.createProduct);

module.exports = router;
