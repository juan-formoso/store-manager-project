const services = require('../services/sales');

const createSale = async (req, res) => {
  try {
    const saleId = await services.newSale();
    const { body } = req;
    const response = await services.insertSale(saleId, body);
    body.forEach(async (b) => {
      await services.deleteQuantity(b);
    });
    return res.status(201).json(response);
  } catch (error) {
    return error;
  }
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
    if (!response.length) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await services.updateSale(Number(id), body);
    return res.status(200).json(response);
  } catch (error) {
    return error;
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleId = await services.getById(Number(id));
    if (!saleId.length) res.status(404).json({ message: 'Sale not found' });
    await services.updateQuantity(saleId[0].quantity, saleId[0].product_id);
    await services.deleteById(Number(id));
    return res.status(200).json(saleId);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteById,
};
