const express = require('express');
const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');
const config = require('../config/default.json');
const { totp } = require('otplib');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
// const jwt_decode = require('jwt-decode');
const nodemailer = require("nodemailer");

const createError = require('http-errors');

const router = express.Router();

router.post('/login', async (req, res) => {
    // entity = {
    //   "Name": "admin",
    //   "Password": "admin"
    // }
  const ret = await authModel.login(req.body);
  if (ret === null) {
    return res.json({
      authenticated: false
    })
  }
  const userId = ret.Id;
  const accessToken = generateAccessToken(userId);

  const refreshToken = randToken.generate(config.auth.refreshTokenSz);
  await userModel.updateRefreshToken(userId, refreshToken);

  res.json({
    // authenticated: true,
    accessToken,
    refreshToken
  })
})
router.post('/refreshToken', async (req, res) => {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  // const { userId } = jwt_decode(req.body.accessToken);
  jwt.verify(req.body.accessToken, config.auth.secret, { ignoreExpiration: true }, async function (err, payload) {
    const { userId } = payload;
    const ret = await userModel.verifyRefreshToken(userId, req.body.refreshToken);
    if (ret === false) {
      throw createError(400, 'Invalid refresh token.');
    }

    const accessToken = generateAccessToken(userId);
    res.json({ accessToken });
  })
});
const generateAccessToken = userId => {
    const payload = { userId };
    const accessToken = jwt.sign(payload, config.auth.secret, {
      expiresIn: config.auth.expiresIn
    });
  
    return accessToken;
}


//router Test /////////////////////////////////////

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
  totp.options = { step: 180 }; // set ts otp 180s
  const token = totp.generate("baoson123");
  console.log(token);
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
      res.json({succes:false})
    } else {
      console.log('Email sent: ' + info.response);
      res.json({succes:true})
    }
  });
});



module.exports = router;