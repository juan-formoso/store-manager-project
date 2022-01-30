const rescue = require('express-rescue');
const products = require('express').Router();
const joi = require('joi');
const productsService = require('../services/products');

const productsSchema = joi
  .object({
    name: joi.string().min(5).required(),
    quantity: joi.number().integer().min(1).required(),
  })
  .messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.integer': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
  });

const validateProductsSchema = (body) => {
  const { error } = productsSchema.validate(body);
  const { code, status } = productsService.validateError(body);
  if (error) {
    throw productsService.errorStatusAndMessage(code, status, error.message);
  }
};

products.post(
  '/',
  rescue(async (req, res) => {
    validateProductsSchema(req.body);
    const { name, quantity } = req.body;
    const newProduct = await productsService.addProduct({ name, quantity });
    return res.status(201).json(newProduct);
  }),
);

module.exports = products;
