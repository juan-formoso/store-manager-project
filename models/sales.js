const connection = require('./connection');

const insertNewId = async () => {
  const [rows] = await connection.execute('INSERT INTO StoreManager.sales VALUES ()');
  return rows.insertId;
};

const insertSale = async (sales) => {
  const id = await insertNewId();
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?';
  const saleValue = sales.map((sale) => [id, sale.product_id, sale.quantity]);
  await connection.query(query, [saleValue]);
  return { id, itemsSold: sales };
};

module.exports = { insertSale };
