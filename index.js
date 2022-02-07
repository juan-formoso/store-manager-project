const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routers/products.routes');
const salesRouter = require('./routers/sales.routes');
// Comment to commit

const app = express();
app.use(bodyParser.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('');
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
