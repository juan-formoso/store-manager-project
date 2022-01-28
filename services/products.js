const productsModel = require('../models/products');

const validateName = async (name) => {
  const productExists = await productsModel.productExists(name);
  switch (true) {
    case name === undefined:
      return { code: 400, message: '"name" is required' };
    case name.length < 5:
      return {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      };
    case productExists:
      return { code: 409, message: 'Product already exists' };
    default:
      return {};
  }
};

const validateQuantity = (quantity) => {
  switch (true) {
    case quantity === undefined:
      return { code: 400, message: '"quantity" is required' };
    case typeof quantity === 'string' || quantity < 1:
      return {
        code: 422,
        message: '"quantity" must be a number larger than or equal to 1',
      };
    default:
      return {};
  }
};

const validateProduct = async (name, quantity) => {
  const nameValidation = await validateName(name);
  const productValidation = validateQuantity(quantity);
  switch (true) {
    case nameValidation.code !== undefined:
      return nameValidation;
    case productValidation.code !== undefined:
      return productValidation;
    default:
      return {};
  }
};

const createProduct = async (name, quantity) =>
  productsModel.createProduct(name, quantity);

module.exports = { validateProduct, createProduct };
