const db = require('../utils/db');

module.exports = {
  all: _ => db.load('select * from user'),
  detail: condition => db.detail(condition,'accountpayment'),
  update: (entity,condition)=>db.update(entity,condition,'accountpayment'),
  addtransaction: entity => db.add(entity, 'transaction'),
  detailname: IdAcount => db.load(`SELECT u.Fullname from users as u where u.Id = (SELECT Iduser FROM heroku_cde27c5c75b3548.accountpayment where Id = "${IdAcount}")`),
};