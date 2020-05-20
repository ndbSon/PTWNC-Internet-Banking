const db = require('../utils/db');

module.exports = {
  all: _ => db.load('select * from products'),
  detail: id => db.load(`select * from products where ProID = ${id}`),
};