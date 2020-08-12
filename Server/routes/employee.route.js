const express = require('express');
const router = express.Router();
const authModel = require('../models/auth.model');
const customnerModel = require('../models/customer.model');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const moment = require('moment');

router.post('/signup', async (req, res) => {
    // body = {
    //   "Name": "admin",
    //   "Password": "admin",
    //   "Email":"nhoxsojv@gmail.com",
    //   "Phone":"0123456789",
    //   "Permission": 1,
    //    "Fullname":"Nguyen Van A"
    // }
    let entity = {
        ...req.body,
        Permission: 1,
    };
    const hash = bcrypt.hashSync(entity.Password, 8);
    entity.Password = hash;
    const ret = await authModel.signup(entity);
    if (ret === 1) {
        throw createError(401, "UserName is invalid")
    } else if (ret === 2) {
        throw createError(401, "Email is invalid")
    }else{
        return res.json({...req.body,Idpayment:ret.Id,Amount:ret.Amount});
    }

})

router.get('/transaction', async (req, res) => {
    const Id = req.query.Id;
    const page=req.query.page;
    const limit=req.query.limit;
   
    let start = (page-1)*limit;
    let end = limit;
    const Type = req.query.Type;
    if(Type==='0'){
        let result = await customnerModel.detailtransactionall({ Toaccount: Id },{Fromaccount: Id},start,end);
        let count = await customnerModel.countRowAll(Id)
        
        console.log(typeof count[0])
        return  res.json({result,count:count[0].count});
    }else if(Type==='1'){
        let result = await customnerModel.detailtransaction123({Fromaccount: Id},start,end);
        let count = await customnerModel.count('Fromaccount',Id);
        console.log(count[0].count)
        return  res.json({result,count:count[0].count});
    }else if(Type==='2'){
        let result = await customnerModel.detailtransaction123({Toaccount: Id},start,end);
        let count = await customnerModel.count('Toaccount',Id)
        return  res.json({result,count:count[0].count});
    }else if(Type==='3'){
        let result = await customnerModel.detaildone(Id,start,end);
        let count = await customnerModel.countdebit(Id);
        return  res.json({result,count:count[0].count});
    }
    throw createError(401,"Type dont invalid")

})

router.post('/Money', async (req, res) => {
    // body={
    //     Id số tài khoản
    //     Amount
    // }
    let Iduser= req.tokenPayload.userId
    let { Id, Amount } = req.body;
    console.log("ID: ",Id,"  Amount",Amount)
    let paymet = await customnerModel.detailpayment({ Id });
    let money = parseInt(paymet[0].Amount) + parseInt(Amount);
    await customnerModel.updatepayment({Amount: money.toString()}, { Id });
    let entity = {
        Amount,
        Fromaccount:Iduser,
        Content:"To Bank",
        Toaccount: Id,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Sign: "0",
        Bank: "0",
    }
    await customnerModel.addtransaction(entity);
    res.json({succes:true});
})

router.get('/account', async (req, res) => {
    let result = await customnerModel.all();
    res.json(result)
})

module.exports = router;

