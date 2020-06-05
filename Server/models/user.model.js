const db = require('../utils/db');

module.exports = {
  all: _ => db.load('select * from user'),
  detail: condition => db.detail(condition,'users'),
  update: (entity,condition)=>db.update(entity,condition,'users')
};