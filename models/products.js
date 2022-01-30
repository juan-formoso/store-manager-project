const connection = require('./connection');

const addProduct = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return { id: result.insertId, name, quantity };
};

const getProductByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?;',
    [name],
  );
  return result;
};

module.exports = { addProduct, getProductByName };
