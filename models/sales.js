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

const getSales = async () => {
  const [rows] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
    FROM sales JOIN sales_products ON id = sale_id;`,
  );
  return rows.map(({ sale_id: saleId, ...rest }) => ({ saleId, ...rest }));
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales 
    JOIN sales_product ON id = sale_id WHERE id = ?;`, [id],
  );
  return rows;
};

module.exports = { insertSale, getSales, getById };
