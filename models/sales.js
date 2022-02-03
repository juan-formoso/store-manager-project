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
    `SELECT p.sale_id AS saleId, s.date, p.product_id, p.quantity 
    FROM StoreManager.sales_products 
    AS p INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id;`,
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity 
    FROM StoreManager sales_products 
    AS p INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id 
    WHERE p.sale_id = ?;`, [id],
  );
  return rows;
};

module.exports = { insertSale, getSales, getById };
