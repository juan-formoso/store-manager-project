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

/* const getSales = async () => {
  const [rows] = await connection.execute(
    `SELECT s.id AS saleId, s.date AS date, p.id AS product_id, sp.quantity AS quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    ON sp.product_id = p.id
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id;`,
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT s.id AS sale_id, s.date AS date, p.id AS product_id, sp.quantity AS quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.products AS p
    ON sp.product_id = p.id
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE s.id = ?`, [id],
  );
  return rows;
}; */

module.exports = { insertSale/* , getSales, getById */ };
