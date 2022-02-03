const connection = require('./connection');

const insertSale = async (sales) => {
  const [rows] = await connection.execute(
    'INSERT INTO sales VALUES ()',
  );
    console.log(rows.insertId);
  await sales.forEach(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [rows.insertId, productId, quantity],
    );
  });

  return {
    id: rows.insertId,
    itemsSold: sales,
  };
};

module.exports = { insertSale };
