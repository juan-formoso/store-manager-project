const { 
  insertProduct, 
  getByName, 
  getProducts, 
  getById, 
  update,
  deleteProduct,
} = require('../models/products');

const nameValidation = async (req, res, next) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const quantityValidation = async (req, res, next) => {
  const { body } = req;
  if (!body.quantity && body.quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (typeof body.quantity !== 'number' || body.quantity < 1) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

const productAlreadyExists = async (req, res, next) => {
  const { name } = req.body;
  const productExists = await getByName(name);
  if (productExists) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  next();
};

const productNotFound = async (req, res, next) => {
  const { id } = req.params;
  const foundProduct = await getById(id);
  if (!foundProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await insertProduct(name, quantity);
  return res.status(201).json(newProduct);
};

const getAllProducts = async (req, res) => {
  const productsList = await getProducts();
  return res.status(200).json(productsList);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await getById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await update({ id, name, quantity });
  return res.status(200).json(updatedProduct);
};

const excludeProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteProduct(id);
  return res.status(200).json(deletedProduct);
};

module.exports = { 
  nameValidation, 
  quantityValidation, 
  productAlreadyExists, 
  createProduct, 
  getAllProducts,
  getProductById,
  updateProduct,
  productNotFound,
  excludeProduct,
};
