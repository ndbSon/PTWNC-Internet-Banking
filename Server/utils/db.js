const mysql = require('mysql');
const { promisify } = require('util');
// const promisify = require('util').promisify;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456', 
  database: 'test'
});

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
};
