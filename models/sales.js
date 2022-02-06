const connection = require('./connection');

const errorMessage = 'Internal Server Error';

const saleID = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT MAX(`id`) AS `id` FROM StoreManager.sales;',
    );
    const id = rows[0].id + 1 || 1;
    return id;
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const newSale = async () => {
  try {
    const id = await saleID();
    await connection.execute(
      'INSERT INTO StoreManager.sales (id) VALUE (?);',
      [id],
    );
    return id;
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const insertSale = async (saleId, sales) => {
  try {
    const salesArr = sales.map(({ product_id: productId, quantity }) => (
      [saleId, productId, quantity]
    ));
    await connection.query(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE ?',
      [salesArr],
    );
    return {
      id: saleId,
      itemsSold: sales,
    };
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const updateQuantityCreate = async ({ product_id: productId, quantity }) => {
  try {
    await connection.execute(
      `UPDATE StoreManager.products SET quantity = quantity - ?
      WHERE id = ?;`, [quantity, productId],
    );
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const getAll = async () => {
  try {
    const [rows] = await connection.execute(
      `SELECT P.sale_id AS saleId, S.date, P.product_id, P.quantity
      FROM StoreManager.sales_products AS P
      INNER JOIN StoreManager.sales AS S ON P.sale_id = S.id;`,
    );
    return rows;
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const getById = async (id) => {
  try {
    const [rows] = await connection.execute(
      `SELECT S.date, P.product_id, P.quantity FROM StoreManager.sales_products AS P
      INNER JOIN StoreManager.sales AS S ON P.sale_id = S.id WHERE P.sale_id = ?;`,
      [id],
    );
    return rows;
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const updateSale = async (id, sale) => {
  try {
    const { product_id: productId, quantity } = sale[0];
    await connection.execute(
      `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
      WHERE sale_id = ?;`, [productId, quantity, id],
    );
    return {
      saleId: id,
      itemUpdated: sale,
    };
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const deleteById = async (id) => {
  try {
    const [rows] = await connection.execute(
      'DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id],
    );
    return rows;
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const updateQuantityDelete = async (quantity, productId) => {
  try {
    await connection.execute(
      `UPDATE StoreManager.products SET quantity = quantity + ?
      WHERE id = ?;`, [quantity, productId],
    );
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

const getProductQuantity = async (productId) => {
  try {
    const [rows] = await connection.execute(
      'SELECT quantity FROM StoreManager.products WHERE id = ?', [productId],
    );
    return rows[0];
  } catch (error) {
    return { error: true, codeStatus: 500, message: errorMessage };
  }
};

module.exports = {
  saleID,
  newSale,
  insertSale,
  updateQuantityCreate,
  getAll,
  getById,
  updateSale,
  deleteById,
  updateQuantityDelete,
  getProductQuantity,
};
