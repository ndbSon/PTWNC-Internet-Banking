const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { totp } = require('otplib');
const moment = require('moment');
const createError = require('http-errors');
const userModel = require('../models/user.model');
const customnerModel = require('../models/customer.model');
const authModel = require('../models/auth.model');
const nodemailer = require("nodemailer");

router.get('/info',async (req,res)=>{
    let rows = await customnerModel.detail({ Id: req.tokenPayload.userId });
    let result = {
        Name:rows[0].Name,
        Email:rows[0].Email,
        Phone:rows[0].Phone,
        Fullname:rows[0].Fullname
    }
    res.json({...result});
})

router.post('/changePassword', async (req, res) => {
    //    body={
    //        oldpass
    //        newpass
    //    }
    let {
        oldpass,
        newpass
    }=req.body;
    let rows = await userModel.detail({ Id: req.tokenPayload.userId });// req.tokenPayload lấy từ acceskey bên file middleewares
    let Pwd = rows[0].Password;
    if (bcrypt.compareSync(oldpass, Pwd)) {
        const hash = bcrypt.hashSync(newpass, 8);
        await userModel.update({ Password: hash }, { Id: req.tokenPayload.userId });
        return res.json({ succes: true });
    }else{
        throw createError(401, "Old Password is incorrect");
    }
   
})

router.get('/account', async (req, res) => {
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let saving = await customnerModel.detailsaving({ Iduser: req.tokenPayload.userId });
    res.json({ paymet, saving })
})

router.post('/addAccountRemind', async (req, res) => {
    // body={
    //    Id, số tài khoản
    //    Name, tên gợi nhớ có thể có hoặc null
    // }
    let entity = {
        ...req.body,
        Iduser: req.tokenPayload.userId
    };
    let rows = await customnerModel.nameaccountremind(req.body.Idaccount);
    if (rows.length === 0) {
        throw createError(401, "Id Account no found")
    }
    if (entity.Name === null) {
        entity = {
            ...entity,
            Name: rows[0].Name,
        }
    }
    await customnerModel.addaccountremind(entity);
    res.json({ succes: true })
})

router.post('/updateAccountRemind', async (req, res) => {
    // updateaccountremind
    let { Idaccount, Name } = req.body;
    let Iduser = req.tokenPayload.userId;
    let rows = await customnerModel.detailremind({ Iduser })
    let tempt = rows.find(r => r.Idaccount === Idaccount);
    if (tempt === undefined) {
        throw createError(401, "Id Account no found");
    } else {
        await customnerModel.updateaccountremind({ Name }, { Id: tempt.Id });
        return res.json({ succes: true });
    }
})

router.post('/deleteAccountRemind', async (req, res) => {
    var { Idaccount } = req.body
    let rows = await customnerModel.detailremind({ Iduser: req.tokenPayload.userId })
    let tempt = rows.find(r => r.Idaccount === Idaccount);
    console.log("tempt: ", tempt);
    if (tempt === undefined) {
        throw createError(401, "Id Account no found");
    } else {
        await customnerModel.deleteaccountremind({ Id: tempt.Id });
        return res.json({ succes: true });
    }


})

router.get('/getNameRemind', async (req, res) => {
    let Id = req.query.Id;
    let rows = await customnerModel.detailremind({ Iduser: req.tokenPayload.userId });
    let result = rows.find(r => r.Idaccount === Id);
    if (result !== undefined) {
        return res.json({ Name: result.Name });
    } else {
        let tempt = await customnerModel.nameaccountremind(Id);
        if (tempt.length > 0) {
            return res.json({ Name: tempt[0].Fullname });
        }
        throw createError(401, "No payment found");
    }
})

router.get('/checkNameRemind', async (req, res) => {
    let Id = req.query.Id;
    let rows = await customnerModel.checknameremind(Id,req.tokenPayload.userId);
   if(rows.length===0){
      return res.json({result:true})
   }else{
    return res.json({result:false})
   }
})

router.get('/listAccountRemind', async (req, res) => {
    let rows = await customnerModel.detailremind({ Iduser: req.tokenPayload.userId });
    let result = rows.map(row => {
        let tempt = {
            Name: row.Name,
            Idaccount: row.Idaccount
        }
        return tempt;
    })
    res.json(result);
})

router.post('/tranfers', async (req, res) => {
    var { token, Amount, Id, Content, charge,ToName } = req.body;
    Amount=parseInt(Amount);
    let fmoney, tmoney;
    const isValid = totp.verify({ token, secret: 'baoson123' });
    
    if (isValid === false) {
        // return res.status(400).json({ succes: false, text: "Sai OTP" });
        throw createError(401, "Sai OTP");
    }
    let ac = await customnerModel.detailpayment({ Id: Id });
    if (ac.length == 0) {
        // return res.status(400).json({ succes: false, text: "Tài Khoản Không Tồn Tại" });
        throw createError(401, "Tài Khoản Không Tồn Tại");
    }
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    // console.log("Amount:  ", Amount, typeof Amount, " --  ", parseInt(paymet[0].Amount))
    if (Amount < parseInt(paymet[0].Amount)) {
        // console.log("charge:  ", charge, "  -  ", typeof charge)
        if (charge === true) {
            fmoney = parseInt(paymet[0].Amount) - Amount - 1000;
            tmoney = parseInt(ac[0].Amount) + Amount;
            // console.log("0:  ", fmoney, "  -  ", tmoney)
        } else if (charge === false) {
            fmoney = parseInt(paymet[0].Amount) - Amount;
            tmoney = parseInt(ac[0].Amount) + Amount - 1000;
            // console.log("1:  ", fmoney, "  -  ", tmoney)
        } else {
            // return res.status(400).json({ succes: false });
            throw createError(401, "charge dont invalid");
        }

    } else {
        // return res.status(400).json({ succes: false, text: "Tài Khoản Không Đủ" });
        throw createError(401, "Tài Khoản Không Đủ Số Dư");
    }
    let tempt= await customnerModel.detail({Id:req.tokenPayload.userId})
    let FromName=tempt[0].Fullname;
    let entity = {
        Amount,
        Fromaccount: paymet[0].Id,
        Content,
        Toaccount: Id,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Sign: "0",
        Bank: "0",
        ToName,
        FromName
    }
    let result = await customnerModel.addtransaction(entity);
    await customnerModel.updatepayment({ Amount: fmoney.toString() }, { Id: paymet[0].Id });
    await customnerModel.updatepayment({ Amount: tmoney.toString() }, { Id: Id });

    res.json({ succes: true, Idtransaction: result.insertId });
})

router.post('/addebit', async (req, res) => {
    // body={
    //     Iddebit, số tài khoản nợ
    //     Namedebit
    //     Amount, số tiền
    //     Content,
    // }
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let Nameaccount = await customnerModel.nameaccountremind(paymet[0].Id);
    let entity = {
        ...req.body,
        Idaccount: paymet[0].Id,
        Nameaccount: Nameaccount[0].Fullname,
        Done: 0 // chua tra no
    };
    let result = await customnerModel.addebit(entity);
    console.log("result", result.insertId);
    res.json({ succes: true, Id: result.insertId });

})

router.get('/mydebit', async (req, res) => {
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let mydebit = await customnerModel.detaildebit({ Idaccount: paymet[0].Id });
    let tempt =[];
    mydebit.map((debit)=>{
        if(debit.Done===0 || debit.Done===1){
            tempt.push(debit);
        }
    })
    // console.log("tempt: ",tempt);
    res.json(tempt);
})

router.get('/debitother', async (req, res) => {
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    let debitother = await customnerModel.detaildebit({ Iddebit: paymet[0].Id });
    let tempt =[];
    debitother.map((debit)=>{
        if(debit.Done===0 || debit.Done===2){
            tempt.push(debit);
        }
    })
    // console.log("tempt: ",tempt);
    res.json(tempt);
})

router.post('/deletemydebit', async (req, res) => {
    var { Id } = req.body
    await customnerModel.deletedebit({ Id });
    res.json({ succes: true });
})

router.post('/donedebit', async (req, res) => {
    // id debit
    // Idtransaction 
    let {Idtransaction,Reason}=req.body;
    let a = await customnerModel.updatedebit({ Done: 1,Idtransaction,Reason }, { Id: req.body.Id });
    if (a.affectedRows == 1) {
        res.json({ succes: true });
    } else {
        throw createError(401, "id debit not found")
    }
})

router.post('/deletedebit', async (req, res) => {
    //Done
    //id
    //Reason
    let { Id, Done, Reason } = req.body;
    let a = await customnerModel.updatedebit({ Done: Done, Reason: Reason }, { Id: Id });
    if (a.affectedRows == 1) {
        res.json({ succes: true });
    } else {
        throw createError(401, "id debit not found")
    }
})

router.get('/transaction', async (req, res) => {
    let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
    const page=req.query.page;
    const limit=req.query.limit;
   
    let start = (page-1)*limit;
    let end = limit;
    const Type = req.query.Type;
    if(Type==='0'){
        let result = await customnerModel.detailtransactionall({ Toaccount: paymet[0].Id },{Fromaccount: paymet[0].Id},start,end);
        let count = await customnerModel.countRowAll(paymet[0].Id)
        return  res.json({result,count:count[0].count});
    }else if(Type==='1'){
        let result = await customnerModel.detailtransaction123({Fromaccount: paymet[0].Id},start,end);
        let count = await customnerModel.count('Fromaccount',paymet[0].Id);
        return  res.json({result,count:count[0].count});
    }else if(Type==='2'){
        let result = await customnerModel.detailtransaction123({Toaccount: paymet[0].Id},start,end);
        let count = await customnerModel.count('Toaccount',paymet[0].Id)
        return  res.json({result,count:count[0].count});
    }else if(Type==='3'){
        let result = await customnerModel.detaildone(paymet[0].Id,start,end);
        let count = await customnerModel.countdebit(paymet[0].Id);
        return  res.json({result,count:count[0].count});
    }
    throw createError(401,"Type dont invalid")

})

router.post('/sendotp', async (req, res) => {
    //req.body{ Name,gmail} gửi lên
    totp.options = { step: 300 }; // set ts otp 300s
    //    console.log("key: ",typeof req.tokenPayload.userId)
    let key = req.tokenPayload.userId
    const token = totp.generate('baoson123');
    console.log(token);
    let verify = await authModel.verifySendOTP(req.body);
    if (verify == false) {
        // return res.json({err:"gmail or Name dont Invalid"});
        throw createError(401, "gmail or Name dont Invalid");
    }
    var transporter = nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'testotpwnc@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'testotp123456' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
             <div style="padding: 10px; background-color: white;">
             <p>Chào ${req.body.Name}</p><br>
             <p>Mã xác nhận OTP của bạn là:  </p><br>
             <h1> ${token}</h1>
             <p>Mã xác nhận sẽ thay đổi trong 3 phút. </p>
                 <span style="color: black">Đây là mail test</span>
             </div>  
     `;
    var mailOptions = {
        from: `testotpwnc@gmail.com`,
        to: `${req.body.email}`,
        subject: 'Gửi Mã OTP',
        html: content
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            // return res.json({err:error.message})
            throw createError(401, error.message);
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ succes: true })
        }
    });
});





module.exports = router;