const rescue = require('express-rescue');
const productsService = require('../services/products');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message } = await productsService.validateProduct(
    name,
    quantity,
  );
  if (code !== undefined) return res.status(code).json({ message });
  const product = await productsService.createProduct(name, quantity);
  res.status(201).json(product);
});

module.exports = { createProduct };
