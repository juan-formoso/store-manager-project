const mysql = require('mysql2/promise');
require('dotenv').config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const connection = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: 'StoreManager',
});

module.exports = connection;
