const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const productsController = require('./controllers/products');

app.use(bodyParser.json());

require('dotenv').config();

app.use('/products', productsController);

app.use((err, req, res, next) => {
  if (err.code) {
    return res
      .status(err.code)
      .json({ status: err.status, message: err.message });
  }
  return next(err);
});

app.use((err, req, res, next) => {
  const errorMap = {
    notFound: 404,
  };
  const status = errorMap[err.code];
  if (!status) {
    next(err);
  }
  return res.status(status).json(err);
});

app.use((err, req, res, _next) =>
  res.status(500).json({
    code: 'internal_server_error',
    message: 'error processing request',
  }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
