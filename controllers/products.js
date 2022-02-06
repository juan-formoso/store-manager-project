const services = require('../services/products');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await services.insertProduct({ name, quantity });
  return res.status(201).json(response);
};

const getAll = async (_req, res) => {
  try {
    const response = await services.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getById(Number(id));
    if (!response.length) { 
      return res.status(404).json({ message: 'Product not found' }); 
    }
    return res.status(200).json(response[0]);
  } catch (error) {
    return error;
  }
};

const update = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const response = await services.update({ id, name, quantity });
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await services.getById(id);
    await services.deleteById(Number(id));
    return res.status(200).json(productId[0]);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createProduct,
  getAll,
  getById,
  update,
  deleteById,
};
