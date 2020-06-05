const db = require('../utils/db');

module.exports = {
    trans: (begin,end) => db.load(`select * from transaction where Date BETWEEN "${begin}" AND "${end}"`),
    transbank: (begin,end,Bank) => db.load(`select * from transaction where Date BETWEEN "${begin}" AND "${end}" and Bank ="${Bank}"`),
    //detail: condition => db.detail(condition,'users'),
    //update: (entity,condition)=>db.update(entity,condition,'users')
    detaildone: (begin,end) => db.all(`SELECT transaction.* FROM transaction INNER JOIN (select * from debit where Done=1 ) as debit on debit.Idtransaction=transaction.Id and transaction.Date BETWEEN "${begin}" AND "${end}"`),
};