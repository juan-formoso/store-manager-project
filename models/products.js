const connection = require('./connection');

const errorMessage = 'Internal Server Error';

const insertProduct = async ({ name, quantity }) => {
  try {
    const [rows] = await connection.execute(
      'INSERT INTO StoreManager.products (`name`, `quantity`) VALUE (?, ?);', 
      [name, quantity],
    );
    return {
      id: rows.insertId,
      name,
      quantity,
    };
  } catch (error) {
    console.log(`Model ${error}`);
    return {
      error: true,
      codeStatus: 500,
      message: errorMessage,
    };
  }
};

const getByName = async (name) => {
  try {
    const [rows] = await connection.execute(
      'SELECT name FROM StoreManager.products WHERE name = ?;', [name],
    );
    return rows;
  } catch (error) {
    console.log(`Model ${error}`);
    return {
      error: true,
      codeStatus: 500,
      message: errorMessage,
    };
  }
};

const getAll = async () => {
  try {
    const [rows] = await connection.execute('SELECT * FROM StoreManager.products;');
    return rows;
  } catch (error) {
    console.log(`Model ${error}`);
    return {
      error: true,
      codeStatus: 500,
      message: errorMessage,
    };
  }
};

const getById = async (id) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?;', 
      [id],
    );
    return rows;
  } catch (error) {
    console.log(`Model ${error}`);
    return {
      error: true,
      codeStatus: 500,
      message: errorMessage,
    };
  }
};

const updateProduct = async ({ id, name, quantity }) => {
  try {
    const [newProduct] = await connection.execute(
      'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;', 
      [id, name, quantity],
    );
    return {
      id: newProduct.insertId,
      name,
      quantity,
    };
  } catch (error) {
    console.log(`Model ${error}`);
    return {
      error: true,
      codeStatus: 500,
      message: errorMessage,
    };
  }
};

const deleteById = async (id) => {
  try {
    const [rows] = await connection.execute(
      'DELETE FROM StoreManager.products WHERE id = ?;', [id],
    );
    return {
      id: rows.insertId,
    };
  } catch (error) {
    console.log(`Model ${error}`);
    return {
      error: true,
      codeStatus: 500,
      message: errorMessage,
    };
  }
};

module.exports = {
  insertProduct,
  getByName,
  getAll,
  getById,
  updateProduct,
  deleteById,
};
