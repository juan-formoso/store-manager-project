const connection = require('./connection');

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

module.exports = { insertProduct };
