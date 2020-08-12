const express = require('express');
const router = express.Router();
const authModel = require('../models/auth.model');
const adminModel = require('../models/admin.model');
const customnerModel = require('../models/customer.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const createError = require('http-errors');

router.post('/signup', async (req, res) => {
    // body = {
    //   "Name": "admin",
    //   "Password": "admin",
    //   "Email":"nhoxsojv@gmail.com",
    //   "Phone":"0123456789",
    // }
    let entity = {
        ...req.body,
        Permission: 2,
    };
    const hash = bcrypt.hashSync(entity.Password, 8);
    entity.Password = hash;
    const ret = await authModel.signup(entity);
    if (ret === 1) {
        return res.status(400).json({ succes: false, text: "Tên Đăng Nhập Đã Tồn Tại" });
    } else if (ret === 2) {
        return res.status(400).json({ succes: false, text: "Email  Đã Tồn Tại" });
    }
    return res.json({ succes: true });
})

router.get('/transaction', async (req, res) => {
    const begin = req.query.begin;
    const end = req.query.end;
    const page=req.query.page;
    const limit=req.query.limit;
    const Type=parseInt(req.query.Type);
    let start = (page-1)*limit;
    let endpage = limit;

    if(Type===1){
        let result = await adminModel.trans(begin,end,start,endpage);
    let count = await adminModel.countRowAll(begin,end)
    return res.json({result,count:count[0].count})
    }else if(Type===2){
        let result = await adminModel.transbankdetail(begin,end,"0",start,endpage);
        let count = await adminModel.countRowDetail(begin,end,"0")
        return res.json({result,count:count[0].count})
    }else if(Type===3){
        let result = await adminModel.transbank(begin,end,start,endpage);
        let count = await adminModel.countBankOther(begin,end)
        return res.json({result,count:count[0].count})
    }else if(Type===4){
        let result = await adminModel.transbankdetail(begin,end,"SAPHASANBank",start,endpage);
        let count = await adminModel.countRowDetail(begin,end,"SAPHASANBank")
        return res.json({result,count:count[0].count})
    }else if(Type===5){
        let result = await adminModel.transbankdetail(begin,end,"PGP",start,endpage);
        let count = await adminModel.countRowDetail(begin,end,"PGP")
        return res.json({result,count:count[0].count})
    }
    // let result = await adminModel.trans(begin,end,start,endpage);
    // let count = await adminModel.countRowAll(begin,end)
    // res.json({result,count:count[0].count})
})

router.get('/transbank', async (req, res) => {
    // body={ hiển thị các giao dịch lọc theo ngày
    //     begin ngày bắt đầu
    //     end ngày kết thúc
    // }
    let begin = req.query.begin;
    let end = req.query.end;
    let Bank = req.query.Bank;
    let trans = await adminModel.transbank(begin,end,Bank);
    res.json({trans})
})

router.post('/lockaccount', async (req, res) => {
    let {Id} =req.body;
    let Iduser = await customnerModel.detailpayment({Id});
    await userModel.update({Permission:0},{Id:Iduser[0].Iduser});
    res.json(Id)
})

router.post('/openlock', async (req, res) => {
    let {Id} =req.body;
    let Iduser = await customnerModel.detailpayment({Id});
    await userModel.update({Permission:1},{Id:Iduser[0].Iduser});
    res.json(Id)
})

router.get('/account', async (req, res) => {
    let result = await adminModel.all();
    res.json(result)
})

router.post('/update', async (req, res) => {
    let {Id,Email,Phone}=req.body;
    let Iduser = await customnerModel.detailpayment({Id});
    let result;
    if(Email===undefined){
        result = await userModel.update({Phone},{Id:Iduser[0].Iduser});
    } else if(Phone===undefined){
        result = await userModel.update({Email},{Id:Iduser[0].Iduser});
    }else {
        result = await userModel.update({Email,Phone},{Id:Iduser[0].Iduser});
    }
    
    
    res.json(result.message)
})

router.get('/detail', async (req, res) => {
    const Id = req.query.Id;
    let Iduser = await customnerModel.detailpayment({Id});
    let result = await userModel.detail({Id:Iduser[0].Iduser})
    res.json({
        Name:result[0].Name,
        Email:result[0].Email,
        Phone:result[0].Phone
    })
})

router.get('/statis',async(req,res)=>{
    const begin = req.query.begin;
    const end = req.query.end;
    const Type= parseInt(req.query.Type);
    if(Type===1){
        let result = await adminModel.statis(begin,end);
        return res.json(result);
    }else if(Type===2){
        let result = await adminModel.statisDetail(begin,end,"0");
        return res.json(result);
    }else if(Type===3){
        let result = await adminModel.statisBankOther(begin,end);
        return res.json(result);
    }else if(Type===4){
        let result = await adminModel.statisDetail(begin,end,"SAPHASANBank");
        return res.json(result);
    }else if(Type===5){
        let result = await adminModel.statisDetail(begin,end,"PGP");
        return res.json(result);
    }

    throw createError(401,"No match")
})


module.exports = router;

