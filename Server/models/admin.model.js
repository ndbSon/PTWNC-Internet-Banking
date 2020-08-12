const db = require('../utils/db');

module.exports = {

    all:()=>db.load('SELECT u.Fullname,u.Name,payment.Id,payment.Amount,u.Permission,u.Phone,u.Email FROM accountpayment as payment, users as u where payment.Iduser=u.Id'),

    test:()=>db.load(`select * from transaction`),
   
    trans: (begin,end,start,endpage) => db.load(`select * from transaction where Date BETWEEN "${begin}" AND "${end}"  ORDER BY Id DESC limit ${start},${endpage} `),
    transbankdetail: (begin,end,Bank,start,endpage) => db.load(`select * from transaction where Date BETWEEN "${begin}" AND "${end}" and Bank ="${Bank}" ORDER BY Id DESC limit ${start},${endpage}`),
    transbank:(begin,end,start,endpage) => db.load(`select * from transaction where Date BETWEEN "${begin}" AND "${end}" and Bank !="0" ORDER BY Id DESC limit ${start},${endpage}`),
   
    countRowAll:(begin,end)=>db.load(`SELECT COUNT(*) as count FROM transaction where Date BETWEEN "${begin}" AND "${end}"`),
    countBankOther:(begin,end)=>db.load(`SELECT COUNT(*) as count FROM transaction where Date BETWEEN "${begin}" AND "${end}" and Bank !="0"`),
    countRowDetail:(begin,end,Bank)=>db.load(`SELECT COUNT(*) as count FROM transaction where Date BETWEEN "${begin}" AND "${end}" and Bank ="${Bank}"`),
   
    detaildone: (begin,end) => db.load(`SELECT transaction.* FROM transaction INNER JOIN (select * from debit where Done=1 ) as debit on debit.Idtransaction=transaction.Id and transaction.Date BETWEEN "${begin}" AND "${end}"`),
    
    statis: (begin,end) => db.load(`SELECT transaction.Date, SUM(Amount) as Sum ,COUNT(*) as count FROM (select * from transaction where Date BETWEEN "${begin}" AND "${end}") as transaction GROUP BY YEAR(Date), MONTH(Date),DATE(Date)`),
    statisDetail: (begin,end,Bank) => db.load(`SELECT transaction.Date, SUM(Amount) as Sum ,COUNT(*) as count FROM (select * from transaction where Date BETWEEN "${begin}" AND "${end}" and Bank ="${Bank}") as transaction GROUP BY YEAR(Date), MONTH(Date),DATE(Date)`),
    statisBankOther: (begin,end) => db.load(`SELECT transaction.Date, SUM(Amount) as Sum ,COUNT(*) as count FROM (select * from transaction where Date BETWEEN "${begin}" AND "${end}" and Bank !="0") as transaction GROUP BY YEAR(Date), MONTH(Date),DATE(Date)`),
};