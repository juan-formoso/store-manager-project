const model = require('../models/sales');

const insertSale = async (saleId, sales) => {
  try {
    const response = await model.insertSale(saleId, sales);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteQuantity = async (valuesUpdate) => {
  try {
    await model.deleteQuantity(valuesUpdate);
  } catch (error) {
    return error;
  }
};

const newSale = async () => {
  try {
    const response = await model.newSale();
    return response;
  } catch (error) {
    return error;
  }
};

const getAll = async () => {
  try {
    const response = await model.getAll();
    return response;
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const response = await model.getById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const updateSale = async (id, sale) => {
  try {
    const response = await model.updateSale(id, sale);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteById = async (id) => {
  try {
    const response = await model.deleteById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const updateQuantity = async (quantity, productId) => {
  try {
    await model.updateQuantity(quantity, productId);
  } catch (error) {
    return error;
  }
};

const getProductQuantity = async (productId) => {
  try {
    const response = await model.getProductQuantity(productId);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  insertSale,
  deleteQuantity,
  newSale,
  getAll,
  getById,
  updateSale,
  deleteById,
  updateQuantity,
  getProductQuantity,
};
