const connection = require('./connection');

const insertSale = async () => {
  const [rows] = await connection.execute('INSERT INTO StoreManager.sales VALUE ()');
  return rows.insertId;
};

const create = async (sales) => {
  const id = await insertSale();
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE ?';
  const saleValues = sales.map((sale) => [id, sale.product_id, sale.quantity]);
  await connection.query(
    query, [saleValues],
  );
  return {
    id,
    itemsSold: sales,
  };
};

const getSales = async () => {
  const query = `SELECT p.sale_id AS saleId, s.date, p.product_id, p.quantity
                FROM
                    StoreManager.sales_products AS p
                INNER JOIN
                    StoreManager.sales AS s
                ON p.sale_id = s.id;`;
  const [rows] = await connection.execute(query);
  return rows;
};

module.exports = { create, getSales };
