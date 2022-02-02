const model = require('../models/products');

const getByName = async (name) => model.getByName(name);

module.exports(getByName);
