const services = require('../services/sales');

const productIdValidation = (req, res, next) => {
  const { body } = req;
  const validProductId = body.every((b) => (Object.keys(b).includes('product_id')));
  if (!validProductId) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};

const salesQuantityValidation = (req, res, next) => {
  const { body } = req;
  const validQuantity = body.every((b) => (Object.keys(b).includes('quantity')));
  if (!validQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const quantityIsNumber = (req, res, next) => {
  const { body } = req;
  const validNumberInteger = body.every((b) => (Number.isInteger(b.quantity)));
  const validNotZero = body.every((b) => (b.quantity <= 0));
  if (!validNumberInteger || validNotZero) {
    return res.status(422).json({
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

const amountValidation = async (req, res, next) => {
  const { body } = req;
  const quantityBody = body.map(async ({ product_id: productId }) => {
    const arrayQuantity = await services.getQuantityProducts(productId);
    return arrayQuantity;
  });
  const arrayQuantity = await Promise.all(quantityBody);
  const quantityValid = body.every(({ quantity }, index) => (
    quantity < arrayQuantity[index].quantity
  ));
  if (!quantityValid) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  productIdValidation,
  salesQuantityValidation,
  quantityIsNumber,
  amountValidation,
};
