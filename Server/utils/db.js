const mysql = require('mysql');
const { promisify } = require('util');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
  update:(entity,condition,tableName) => pool_query(`UPDATE ${tableName} SET ? WHERE ?`,[entity,condition]),
  detail: (condition,tableName)=> pool_query(`select * from ${tableName} where ?`,condition),
  detail123: (condition,tableName,start,end)=> pool_query(`select * from ${tableName} where ? ORDER BY Id DESC limit ${start},${end}`,condition),
  detailall: (condition1,condition2,tableName,start,end)=> pool_query(`select * from ${tableName} where ? or ? ORDER BY Id DESC limit ${start},${end}`,[condition1,condition2]),
  // count:(condition,tableName)=>pool_query(`SELECT COUNT(*) FROM ${tableName} where ?`,condition),
};
