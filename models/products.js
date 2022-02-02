const connection = require('./connection');

const getByName = async (name) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return rows[0];
};

const insertProduct = async (name, quantity) => {
  const [rows] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const getProducts = async () => {
  const [rows] = await connection.execute('SELECT * FROM products');
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id],
  );
  return { id, name, quantity };
};

const deleteContent = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = { insertProduct, getByName, getProducts, getById, update, deleteContent };
