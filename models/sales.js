const connection = require('./connection');

const salesValues = (sales, id) => {
  let values = '';
  sales.forEach(({ product_id: productId, quantity }, i) => {
    if (i) {
      values += `, (${id}, ${productId}, ${quantity})`;
    } else values += `(${id}, ${productId}, ${quantity})`;
  });
  return values;
};

const insertSale = async (sales) => {
  const [rows] = await connection.execute('INSERT INTO sales VALUES ()');
  await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${salesValues(
      sales,
      rows.insertId,
    )}`,
  );
  return {
    id: rows.insertId,
    itemsSold: sales,
  };
};

module.exports = { insertSale };
