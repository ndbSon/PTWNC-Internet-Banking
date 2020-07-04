const express = require('express');
const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');
const config = require('../config/default.json');
const { totp } = require('otplib');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const bcrypt = require('bcryptjs');
// const jwt_decode = require('jwt-decode');
const nodemailer = require("nodemailer");

const createError = require('http-errors');

const router = express.Router();



router.post('/login', async (req, res) => {
    // entity = {
    //   "Name": "admin",
    //   "Password": "admin"
    // }
  let entity= req.body;
  const ret = await authModel.login(entity);
  if (ret === null) {
    return res.json({
      authenticated: false
    })
  }
  const info = {
    userId:ret.Id,
    Permission: ret.Permission
  };
  const accessToken = generateAccessToken(info);

  const refreshToken = randToken.generate(config.auth.refreshTokenSz);
  await authModel.updateRefreshToken(info.userId, refreshToken);

  res.json({
    // authenticated: true,
    email:ret.Email,
    accessToken,
    refreshToken
  })
})

router.post('/refreshToken', async (req, res) => {
  // req.body = {
    // accessToken,
    // refreshToken
  // }
  // const { userId } = jwt_decode(req.body.accessToken);
  jwt.verify(req.body.accessToken, config.auth.secret, { ignoreExpiration: true }, async function (err, payload) {
    const { userId } = payload;
    const ret = await authModel.verifyRefreshToken(userId, req.body.refreshToken);
    if (ret === false) {
      throw createError(400, 'Invalid refresh token.');
    }

    const accessToken = generateAccessToken(userId);
    res.json({ accessToken });
  })
});

const generateAccessToken = info => {
    const payload = info;
    const accessToken = jwt.sign(payload, config.auth.secret, {
      expiresIn: config.auth.expiresIn
    });
  
    return accessToken;
}

//router Test OTP/////////////////////////////////////

router.post('/checkotp', async (req, res) => {
  var {token}=req.body;
  console.log("token",token);
  const isValid1 = totp.check(token, "baoson123");
  const isValid2 = totp.verify({ token, secret :"baoson123" });
  console.log(isValid1,"   ",isValid2);
  res.json({isValid1,isValid2});
});

router.post('/sendotp', async (req, res) => {
   //req.body{ Name,gmail} gửi lên
  totp.options = { step: 300 }; // set ts otp 300s
  const token = totp.generate("baoson123");
  console.log(token);
  let verify = await authModel.verifySendOTP(req.body);
  if(verify==false){
    return res.json({succes:false});
  }
  var transporter =  nodemailer.createTransport({ // config mail server
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
    to: `${req.body.gmail}`,
    subject: 'Gửi Mã OTP',
    html: content
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.json({succes:false})
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({succes:true})
    }
  });
});

router.post('/forgetPassword',async (req, res) => {
   //req.body{Name,newPassword,token} gửi lên
   var {Name,Password,token}=req.body;
   const isValid1 = totp.check(token, "baoson123");
   if(isValid1===true){
    const hash = bcrypt.hashSync(Password, 8);
    await userModel.update({Password:hash},{Name});
    return res.json({succes:true})
   }
   return res.json({succes:false})
})





module.exports = router;