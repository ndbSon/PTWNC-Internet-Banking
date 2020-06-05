const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { totp } = require('otplib');
const moment = require('moment');
const userModel = require('../models/user.model');
const customnerModel = require('../models/customer.model');

router.post('/changePassword', async (req, res) => {
    //    body={
    //        oldpass
    //        newpass
    //    }
    let rows = await userModel.detail({ Id: req.tokenPayload.userId });// req.tokenPayload lấy từ acceskey bên file middleewares
    let Pwd = rows[0].Password;
    if (bcrypt.compareSync(req.body.oldPassword, Pwd)) {
        const hash = bcrypt.hashSync(req.body.newPassword, 8);
        await userModel.update({ Password: hash }, { Id: req.tokenPayload.userId });
        return res.json({ succes: true });
    }
    return res.json({ succes: false });
})

router.get('/acount', async (req, res) => {
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let saving = await customnerModel.detailsaving({ Iduser: req.tokenPayload.userId });
    res.json({ paymet, saving })
})

router.post('/addAcountRemind', async (req, res) => {
    // body={
    //    Id, số tài khoản
    //    Name, tên gợi nhớ có thể có hoặc null
    // }
    let entity = {
        ...req.body,
        Iduser: req.tokenPayload.userId
    };
    if (entity.Name === null) {
        let rows = await customnerModel.nameaccountremind(req.body.Idacount);

        entity = {
            ...entity,
            Name: rows[0].Name,
        }
    }
    await customnerModel.addaccountremind(entity);
    res.json({ succes: true })
})

router.post('/deleteAcountRemind', async (req, res) => {
    // body={
    //    Id, số tài khoản
    // }
    let rows = await customnerModel.detailremind({ Iduser: req.tokenPayload.userId })
    let tempt = await rows.map(async (r) => {
        if (r.Idacount == req.body.Idacount) {
            return r.Id;
        }
    })
    if (await tempt[0] === undefined) {
        return res.json({ succes: false })
    } else {
        await customnerModel.deleteaccountremind({ Id: await tempt[0] });
        return res.json({ succes: true });
    }

})

router.get('/listAcountRemind', async (req, res) => {
    let rows = await customnerModel.detailremind({ Iduser: req.tokenPayload.userId })
    res.json(rows);
})

router.post('/tranfers', async (req, res) => {
    //    body={
    //        Idacount, tài khoản người nhận
    //        amount,
    //        charge, "0" người gửi trả phí ; "1" người nhận trả phí
    //        content,
    //        token   mã otp
    //    }

    var { token, Amount, Id, Content, charge} = req.body;
    const isValid = totp.verify({ token, secret: "baoson123" });
    let fmoney,tmoney;
    if (isValid === false) {
        return res.status(400).json({ succes: false, text: "Sai OTP" });
    }
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    if (Amount > parseInt(paymet[0].Amount)) {
        if(charge==0){
            fmoney =parseInt(paymet[0].Amount) - Amount - 10;
            tmoney = parseInt(ac[0].Amount) +Amount;
        }else if(charge==1){
            fmoney =parseInt(paymet[0].Amount) - Amount;
            tmoney = parseInt(ac[0].Amount) +Amount - 10;
        }else{
            return  res.status(400).json({ succes: false});
        }
        return res.status(400).json({ succes: false, text: "Tài Khoản Không Đủ" });
    }
    let ac = await customnerModel.detailpayment({ Id: Id });
    if (ac.length == 0) {
        return res.status(400).json({ succes: false, text: "Tài Khoản Không Tồn Tại" });
    }
    let entity = {
        Amount,
        Fromacount: paymet[0].Id,
        Content,
        Toacount: Id,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Sign: "0",
        Bank: "0",
    }
    let result = await customnerModel.addtransaction(entity);
    await customnerModel.updatepayment({Amount:fmoney.toString()},{Id:paymet[0].Id});
    await customnerModel.updatepayment({Amount:tmoney.toString()},{Id:Id});

    res.json({succes:true , Idtransaction: result.insertId});
})
router.post('/addebit', async (req, res) => {
    // body={
    //     Iddebit, số tài khoản nợ
    //     Amount, số tiền
    //     Content,
    // }
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let entity = {
        ...req.body,
        Idacount :paymet[0].Id,
        Done:0
    };
    await customnerModel.addebit(entity);
    res.json({succes:true});

})

router.get('/debit', async (req, res) => {
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let mydebit = await customnerModel.detaildebit({Idacount:paymet[0].Id});
    let debitother = await customnerModel.detaildebit({Iddebit:paymet[0].Id});
    res.json({mydebit,debitother});
})

router.post('/donedebit', async (req, res) => {
    // id debit
    // Idtransaction 
    let a =await customnerModel.updatedebit({Done:1, Idtransaction},{Id:req.body.Id});
    if(a.affectedRows==1){
        res.json({succes:true});
    }else{
        res.json({succes:false});
    }
})

router.get('/transaction', async (req, res) =>{
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let debit = await customnerModel.detaildone(paymet[0].Id);
    let frAcount = await customnerModel.detailtransaction({Fromacount: paymet[0].Id});
    let toAcount = await customnerModel.detailtransaction({Toacount: paymet[0].Id});
    res.json({debit,frAcount,toAcount})
})

// router.post('/deldebit', async (req, res) =>{

// })



module.exports = router;