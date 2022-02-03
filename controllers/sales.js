const { insertSale, getSales, getById } = require('../models/sales');

const productIdValidation = async (req, res, next) => {
  const sales = req.body;
  const productId = sales.every((sale) => (Object.keys(sale).includes('product_id')));
  if (!productId) return res.status(400).json({ message: '"product_id" is required' });
  next();
};

const quantityValidation = async (req, res, next) => {
  const sales = req.body;
  const quantity = sales.every((sale) => (Object.keys(sale).includes('quantity')));
  const quantityIsNumber = sales.every((sale) => (
    typeof sale.quantity === 'number' && sale.quantity > 0
  ));
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (!quantityIsNumber) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

const saleNotFound = async (req, res, next) => {
  const { id } = req.params;
  const sale = await getById(id);
  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

const createSale = async (req, res) => {
  const sales = req.body;
  const newSale = await insertSale(sales);
  return res.status(201).json(newSale);
};

const getAllSales = async (req, res) => {
  const sales = await getSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sales = await getById(id);
  if (!sales) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sales);
};

module.exports = { 
  createSale, 
  productIdValidation, 
  quantityValidation, 
  saleNotFound, 
  getAllSales, 
  getSaleById,
};
