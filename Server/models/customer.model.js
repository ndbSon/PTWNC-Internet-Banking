const db = require('../utils/db');

module.exports = {
    all: _ => db.load('SELECT u.Fullname,u.Name,payment.Id,payment.Amount,u.Permission,u.Phone,u.Email FROM accountpayment as payment, users as u where payment.Iduser=u.Id and u.Permission=1'),
    detail: condition => db.detail(condition,'users'),
    //update: (entity,condition)=>db.update(entity,condition,'users')
    detailpayment: condition => db.detail(condition, 'accountpayment'),
    detailsaving: condition => db.detail(condition, 'accountsaving'),
    detailremind: condition => db.detail(condition, 'accountremind'),
    detaildebit: condition => db.detail(condition, 'debit'),
    detailtransaction: condition => db.detail(condition, 'transaction'),
    detaildone: (condition,start,end) => db.load(`SELECT transaction.* FROM transaction INNER JOIN (select * from debit where (Done=1 OR Done=3) and Iddebit="${condition}" ) as debit on debit.Idtransaction=transaction.Id limit ${start},${end}`),
    detailtransaction123: (condition,start,end) => db.detail123(condition, 'transaction',start,end),
    detailtransactionall:(condition1,condition2,start,end)=>db.detailall(condition1,condition2,'transaction',start,end),

    addaccountremind: entity => db.add(entity, 'accountremind'),
    addtransaction: entity => db.add(entity, 'transaction'),
    addebit:entity =>db.add(entity,'debit'),

    updatepayment: (entity,condition)=>db.update(entity,condition,'accountpayment'),
    updatedebit: (entity,condition)=>db.update(entity,condition,'debit'),
    updateaccountremind: (entity,condition)=>db.update(entity,condition,'accountremind'),

    deleteaccountremind: condition => db.del(condition, 'accountremind'),
    deletedebit: condition => db.del(condition, 'debit'),

    nameaccountremind: IdAcount => db.load(`SELECT u.Fullname from users as u where u.Id = (SELECT Iduser FROM accountpayment where Id = "${IdAcount}")`),

    countRowAll:(condition)=>db.load(`SELECT COUNT(*) as count FROM transaction where Toaccount="${condition}" or Fromaccount="${condition}"`),
    count:(condition1,condition2)=>db.load(`SELECT COUNT(*) as count FROM transaction where ${condition1}="${condition2}"`),
    countdebit:(condition)=>db.load(`SELECT COUNT(*) as count FROM transaction INNER JOIN (select * from debit where (Done=1 OR Done=3) and Iddebit="${condition}" ) as debit on debit.Idtransaction=transaction.Id`)
};