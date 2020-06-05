const express = require('express');
const router = express.Router();
const authModel = require('../models/auth.model');
const adminModel = require('../models/admin.model');
const bcrypt = require('bcryptjs');

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
    // body={ hiển thị các giao dịch lọc theo ngày
    //     begin ngày bắt đầu
    //     end ngày kết thúc
    // }
    let {begin,end} =req.body;
    let debit = await adminModel.detaildone(begin,end);
    let trans = await adminModel.trans(begin,end);
    res.json({ debit, trans})
})

router.get('/transbank', async (req, res) => {
    // body={ hiển thị các giao dịch lọc theo ngày
    //     begin ngày bắt đầu
    //     end ngày kết thúc
    // }
    let {begin,end,Bank} =req.body;
    let trans = await adminModel.transbank(begin,end,Bank);
    res.json({trans})
})

module.exports = router;

