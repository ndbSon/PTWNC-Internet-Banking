const db = require('../utils/db');

module.exports = {
  all: _ => db.load('select * from user'),
  detail: id => db.load(`select * from user where UserID = ${id}`),
};