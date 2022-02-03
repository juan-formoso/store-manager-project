/* 
const quantityValidation = async (req, res, next) => {
  const { body } = req;
  const arr = body.map(({ quantity }) => quantity);
  arr.forEach((quantity) => {
    if (!quantity && quantity !== 0) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(422).json({ 
        message: '"quantity" must be a number larger than or equal to 1',
      });
    }
  });
  next();
};
*/

const { insertSale } = require('../models/sales');

const productIdValidation = async (req, res, next) => {
  const sales = req.body;
  const productId = sales.every((sale) => (Object.keys(sale).includes('product_id')));
  if (!productId) return res.status(400).json({ message: '"product_id" is required' });
  next();
};

/* const quantityValidation = async (req, res, next) => {
  const sales = req.body;
  const quantity = sales.every((sale) => (Object.keys(sale).includes('quantity')));
  const quantityIsNumber = sales.every((sale) => (
    typeof sale.quantity === 'number' && sale.quantity >= 1
  ));
  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (typeof quantityIsNumber !== 'number' || quantityIsNumber < 1) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
}; */

const quantityValidation = async (req, res, next) => {
  const { body } = req;
  const arr = body.map(({ quantity }) => quantity);
  arr.forEach((quantity) => {
    if (!quantity && quantity !== 0) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(422).json({ 
        message: '"quantity" must be a number larger than or equal to 1',
      });
    }
  });
  next();
};

const createSale = async (req, res) => {
  const sales = req.body;
  const newSale = await insertSale(sales);
  return res.status(201).json(newSale);
};

module.exports = { createSale, productIdValidation, quantityValidation };
