const model = require('../models/products');

const insertProduct = async ({ name, quantity }) => {
  try {
    const response = await model.insertProduct({
      name,
      quantity,
    });  
    return response;
  } catch (error) {
    return error;
  }
};

const getByName = async (name) => {
  try {
    const response = await model.getByName(name);
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

const updateProduct = async ({ id, name, quantity }) => {
  try {
    const response = await model.updateProduct({ id, name, quantity });
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

module.exports = {
  insertProduct,
  getByName,
  getAll,
  getById,
  updateProduct,
  deleteById,
};
