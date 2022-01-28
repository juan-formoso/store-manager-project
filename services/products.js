const productsModel = require('../models/products');

const validateName = async (name) => {
  const productExists = name ? await productsModel.productExists(name) : false;
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
        message: '"quantity" must be larger or equal to 1',
      };
    default:
      return {};
  }
};

const validateProduct = async (name, quantity) => {
  const nameValidation = await validateName(name);
  switch (true) {
    case nameValidation.code !== undefined:
      return nameValidation;
    case validateQuantity(quantity).code !== undefined:
      return validateQuantity(quantity);
    default:
      return {};
  }
};

const createProduct = async (name, quantity) =>
  productsModel.createProduct(name, quantity);

module.exports = { validateProduct, createProduct };
