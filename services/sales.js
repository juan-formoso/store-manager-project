const model = require('../models/sales');

const getSales = async () => {
  const sales = await model.getSales();
  return sales;
};

const getById = async (id) => {
  const sales = await model.getById(id);
  return sales;
};

module.exports = { getSales, getById };
