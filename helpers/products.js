const services = require('../services/products');

const quantityValidation = (req, res, next) => {
  const body = Object.keys(req.body);
  if (!body.includes('quantity')) {
    return res.status(400).json({
      message: '"quantity" is required',
    });
  }
  next();
};

const quantityIsInteger = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(422).json({
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const body = Object.keys(req.body);
  if (!body.includes('name')) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }
  next();
};

const nameSize = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  next();
};

const uniqueName = async (req, res, next) => {
  const { name } = req.body;
  const productName = await services.getByName(name).then((p) => p);
  const valid = productName.some((p) => p.name === name);
  if (valid) { 
    return res.status(409).json({ message: 'Product already exists' });
  }
  next();
};

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  const productId = await services.getById(id);
  if (!productId.length) { 
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  nameValidation,
  nameSize,
  quantityValidation,
  quantityIsInteger,
  uniqueName,
  idValidation,
};
