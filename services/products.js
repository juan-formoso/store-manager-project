const productsModel = require("../models/products");

const errorStatusAndMessage = (code, status, message) => ({
  code,
  status,
  message,
});

const validateError = ({ name, quantity }) => {
  const code =
    !name || (!quantity && quantity !== 0)
      ? { status: "bad_request", code: 400 }
      : { status: "unprocessable_entity", code: 422 };
  return code;
};

const addProduct = async ({ name, quantity }) => {
  const product = await productsModel.getProductByName(name);
  if (product.length === 1) {
    throw errorStatusAndMessage(409, "conflict", "Product already exists");
  }
  const newProduct = await productsModel.addProduct({ name, quantity });
  return newProduct;
};

const getProductByName = async ({ name }) =>
  productsModel.getProductByName(name);

module.exports = {
  addProduct,
  getProductByName,
  validateError,
  errorStatusAndMessage,
};
