const express = require('express');
const router = express.Router();
const authModel = require('../models/auth.model');
const customnerModel = require('../models/customer.model');
const bcrypt = require('bcryptjs');


router.post('/signup', async (req, res) => {
    // body = {
    //   "Name": "admin",
    //   "Password": "admin",
    //   "Email":"nhoxsojv@gmail.com",
    //   "Phone":"0123456789",
    //   "Permission": 1,
    // }
    let entity = {
        ...req.body,
        Permission: 1,
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
    // body={Id số tài khoản}
    let { Id } = req.body;
    let debit = await customnerModel.detaildone(Id);
    let frAcount = await customnerModel.detailtransaction({ Fromacount: Id });
    let toAcount = await customnerModel.detailtransaction({ Toacount: Id });
    res.json({ debit, frAcount, toAcount })
})

router.post('/Money', async (req, res) => {
    // body={
    //     Id số tài khoản
    //     Amount
    // }
    let { Id, Amount } = req.body;
    let paymet = await customnerModel.detailpayment({ Id });
    let money = parseInt(paymet[0].Amount) + Amount;
    await customnerModel.updatepayment({Amount: money.toString()}, { Id });
    res.json({succes:true});
})

module.exports = router;

