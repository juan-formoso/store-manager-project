const { insertProduct } = require('../models/products');

const nameValidation = async (req, res, next) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long"' });
  }
  next();
};

const quantityValidation = async (req, res, next) => {
  const { body } = req;
  if (!body.quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (typeof body.quantity !== 'number' || body.quantity < 1) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await insertProduct(name, quantity);
  return res.status(201).json(newProduct);
};

module.exports = { nameValidation, quantityValidation, createProduct };
