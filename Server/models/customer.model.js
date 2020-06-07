const db = require('../utils/db');

module.exports = {
    //all: _ => db.load('select * from user'),
    //detail: condition => db.detail(condition,'users'),
    //update: (entity,condition)=>db.update(entity,condition,'users')
    detailpayment: condition => db.detail(condition, 'accountpayment'),
    detailsaving: condition => db.detail(condition, 'accountsaving'),
    detailremind: condition => db.detail(condition, 'accountremind'),
    detaildebit: condition => db.detail(condition, 'debit'),
    detailtransaction: condition => db.detail(condition, 'transaction'),
    detaildone: condition => db.load(`SELECT transaction.* FROM transaction INNER JOIN (select * from debit where Done=1 and Iddebit="${condition}" ) as debit on debit.Idtransaction=transaction.Id`),

    addaccountremind: entity => db.add(entity, 'accountremind'),
    addtransaction: entity => db.add(entity, 'transaction'),
    addebit:entity =>db.add(entity,'debit'),

    updatepayment: (entity,condition)=>db.update(entity,condition,'accountpayment'),
    updatedebit: (entity,condition)=>db.update(entity,condition,'debit'),

    deleteaccountremind: condition => db.del(condition, 'accountremind'),



    nameaccountremind: IdAcount => db.load(`SELECT u.Name from users as u where u.Id = (SELECT Iduser FROM internetbanking.accountpayment where Id = "${IdAcount}")`),


};