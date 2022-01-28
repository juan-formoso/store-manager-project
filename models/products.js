const connection = require('./connection');

const checkProduct = async (name) => {
  const [products] = await connection.execute(
    'SELECT * FROM products WHERE products.name = ?',
    [name],
  );
  return products[0] !== undefined;
};

const createProduct = async (name, quantity) => {
  const [rows] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return { id: rows.insertId, name, quantity };
};

module.exports = { createProduct, checkProduct };
