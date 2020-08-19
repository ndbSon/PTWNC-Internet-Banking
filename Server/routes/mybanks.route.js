const express = require('express');
const banksModel = require('../models/banks.model');
const customnerModel = require('../models/customer.model')
var hash = require('object-hash');
const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const axios = require('axios');
const md5 = require('md5');
const crypto = require('crypto');
const { totp } = require('otplib');
const createError = require('http-errors');
const NodeRSA = require('node-rsa');
const myRSA = require('../public/myRSA/key.json');
const pubRSA = require('../public/RSA/key.json');
const myPGP = require('../public/myPGP/keyPGP.json');
const pubPGP = require('../public/PGP/key.json');
const router = express.Router();


router.post('/detailRSA', async (req, res) => {
  const timeStamp = Date.now();
  const partnerCode = "baoSon123"; // SAPHASANBank
  const bodyJson = { accountNumber: req.body.customerId };
  const signature = timeStamp + bodyJson + md5("dungnoiaihet");
  try{
    let result = await axios({
      method: 'post',
      url: 'https://qlbank1.herokuapp.com/api/external/customer', // link ngan hang muon chuyen toi
      data: { accountNumber: req.body.customerId },
      headers: {
        ts: timeStamp,
        partnerCode: partnerCode,
        hashedSign: md5(signature),
      },
    });
    return res.json(result.data);
  }catch (error){
    await Promise.reject(error.response.data)
  }
 
  // if (!result) {
  //   return res.status(404).end();
  // } else {
  //   return res.json(result.data);
  // }
})


router.post("/transfersRSA", async (req, res) => {
  var { accountNumber, amount, content, token,toFullName,feeBySender} = req.body; //feeBySender :true or false
  let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
  let name = await banksModel.detailname(paymet[0].Id);
  const isValid = totp.verify({ token, secret: 'baoson123' });
  if (isValid === false) {
    throw createError(401, "Sai OTP");
  }
  if (amount > parseInt(paymet[0].Amount)) {
    throw createError(401, "Tài Khoản Không Đủ Số Dư");
  }
  const timeStamp = moment().unix() * 1000;
  const partnerCode = "baoSon123";
  const bodyJson = {
    sentUserId: paymet[0].Id,
    sentUserName:name[0].Fullname,
    accountNumber: accountNumber,
    amount: amount,
    feeBySender:feeBySender,
    content: content,
  };
  const signature = timeStamp + bodyJson + md5("dungnoiaihet");
  const keyRSA =myRSA.priRSA;
  const privateKey = new NodeRSA(keyRSA);
  const sign = privateKey.sign(bodyJson, "base64", "base64");
  try{
    let result = await axios({
      method: 'post',
      url: 'https://qlbank1.herokuapp.com/api/external/transaction', // link ngan hang muon chuyen toi
      data: {
        ...bodyJson
      },
      headers: {
        ts: timeStamp,
        partnerCode: partnerCode,
        hashedSign: md5(signature),
        sign: sign,
      },
    });
    // console.log("result: ", result)
    if (result.data.sign) {
        let entity = {
          Amount: amount,
          Fromaccount: paymet[0].Id,
          FromName:name[0].Fullname,
          Toaccount: accountNumber,
          ToName:toFullName,
          Content: content,
          Date: moment().format('YYYY-MM-DD HH:mm:ss'),
          Sign: result.data.sign,
          Bank: "RSA",
        }
        await banksModel.addtransaction(entity)
        console.log("feeBySender: ",feeBySender)
        if(feeBySender===true){
          await customnerModel.updatepayment({ Amount: (parseInt(paymet[0].Amount) - parseInt(amount)-1000).toString() }, { Id: paymet[0].Id });
        }else{
          await customnerModel.updatepayment({ Amount: (parseInt(paymet[0].Amount) - parseInt(amount)).toString() }, { Id: paymet[0].Id });
        }
        return res.json({sign:result.data.sign});
     
    } else {
      throw createError(401, "not found response sign");
    }
  }catch (error){
    console.log("err: ",error.response)
    throw createError(401, error.response);
    // await Promise.reject(error.response)
  }
  
});


router.get('/detailPGP', async function (req, res) {
  const accountId = req.query.accountId;
  console.log("type: ", typeof accountId)
  const partner_code = "nhom6"
  const secret_key = 'day la secret key'
  const passphrase = 'baoson123'
  // const partnerPublicKey = fs.readFileSync(path.join(__dirname, '../public/PGP/hoangsang.asc'), 'utf8');
  // const ourPrivateKey = fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8');
  const partnerPublicKey =pubPGP.EightBank;
  const ourPrivateKey = myPGP.privateKeyPGP;
  const accountIdHashed = crypto.createHmac('SHA1', secret_key).update(accountId).digest('hex')

  let { data: accountIdEncrypted } = await openpgp.encrypt({
    message: openpgp.message.fromText(accountId),
    publicKeys: (await openpgp.key.readArmored(partnerPublicKey)).keys
  });

  accountIdEncrypted = accountIdEncrypted.replace(/\r/g, "\\n").replace(/\n/g, "")

  const currentTime = Math.round((new Date()).getTime())
  const entryTimeHashed = crypto.createHmac('SHA1', secret_key).update(currentTime.toString()).digest('hex')

  let { data: entryTimeEncrypted } = await openpgp.encrypt({
    message: openpgp.message.fromText(currentTime.toString()),
    publicKeys: (await openpgp.key.readArmored(partnerPublicKey)).keys
  });

  entryTimeEncrypted = entryTimeEncrypted.replace(/\r/g, "\\n").replace(/\n/g, "")

  const { keys: [privateKey] } = await openpgp.key.readArmored(ourPrivateKey)
  await privateKey.decrypt(passphrase)

  let { data: digitalSignature } = await openpgp.sign({
    message: openpgp.cleartext.fromText(accountId), // CleartextMessage or Message object
    privateKeys: [privateKey]                             // for signing
  });

  digitalSignature = digitalSignature.replace(/\r/g, "\\n").replace(/\n/g, "")

  console.log(digitalSignature)


  let instance = axios.create({
    baseURL: 'http://34.87.97.142/transactions/receiver-interbank',
    timeout: 5000,
    headers: {
      'x_partner_code': partner_code,
      'x_signature': digitalSignature,
      'x_account_id_hashed': accountIdHashed,
      'x_account_id_encrypted': accountIdEncrypted,
      'x_entry_time_encrypted': entryTimeEncrypted,
      'x_entry_time_hashed': entryTimeHashed
    }
  })

  instance.interceptors.request.use(
    config => {
      config.headers.x_access_token = partner_code
      config.headers.x_signature = digitalSignature
      config.headers.x_account_id_hashed = accountIdHashed
      config.headers.x_account_id_encrypted = accountIdEncrypted
      config.headers.x_entry_time_encrypted = entryTimeEncrypted
      config.headers.x_entry_time_hashed = entryTimeHashed
      return config
    },
    error => {
      console.log("error ne", error)
      return Promise.reject(error)
    }
  )


  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.resolve({ error });
  });

  const response = await instance({
    method: 'get',
    url: ''
  })

  if (response && !response.error) {
    res.status(200).json(response.data)
  } else {
    if (response && response.error && response.error.response && response.error.response.status) {
      throw createError(401, response.error.response.data.message);
      // res.status(response.error.response.status).json(response.error.response.data)
    }
  }

})

router.post('/transferPGP', async function (req, res) {
  let {
    transactionAmount,
    toAccountId,
    toFullName,
    token,
    Content,
    feeBySender
  } = req.body;
  let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
  const isValid = totp.verify({ token, secret: 'baoson123' });

  if (isValid === false) {
    // return res.status(400).json({ succes: false, text: "Sai OTP" });
    throw createError(401, "Sai OTP");
  }

  if (parseInt(transactionAmount) > parseInt(paymet[0].Amount)) {
    throw createError(401, "Tài Khoản Không Đủ Số Dư");
  }
  const partner_code = "nhom6"
  const secret_key = 'day la secret key'
  const passphrase = 'baoson123'
  // const partnerPublicKey = fs.readFileSync(path.join(__dirname, '../public/PGP/hoangsang.asc'), 'utf8');
  // const ourPrivateKey = fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8');
  const partnerPublicKey = pubPGP.EightBank;
  const ourPrivateKey = myPGP.privateKeyPGP;
  let name = await banksModel.detailname(paymet[0].Id);

  let info = {
    transactionAmount,
    toAccountId,
    toFullName,
    fromAccountId: paymet[0].Id,
    fromFullName: name[0].Fullname,
    fromBankId: 'nhom6',
    transactionMessage:Content,
    feeBySender:feeBySender
  }
  // console.log("info: ",info);
  let entryTime = Math.round((new Date()).getTime())
  info.entryTime = entryTime
  const data_hashed = crypto.createHmac('SHA1', secret_key).update(JSON.stringify({
    ...info
  })).digest('hex')
  const { keys: [privateKey] } = await openpgp.key.readArmored(ourPrivateKey)
  await privateKey.decrypt(passphrase)

  let { data: digital_sign } = await openpgp.sign({
    message: openpgp.cleartext.fromText(JSON.stringify(info)), // CleartextMessage or Message object
    privateKeys: [privateKey]                             // for signing
  });

  digital_sign = digital_sign.substring(digital_sign.indexOf('-----BEGIN PGP SIGNATURE-----'), digital_sign.length)
  digital_sign = digital_sign.replace(/\r/g, "\\n").replace(/\n/g, "")

  const { data: bodyData } = await openpgp.encrypt({
    message: openpgp.message.fromText(JSON.stringify(info)),
    publicKeys: (await openpgp.key.readArmored(partnerPublicKey)).keys
  });

  let data = {
    data: bodyData,
    digital_sign,
    data_hashed
  }

  let instance = axios.create({
    baseURL: 'http://34.87.97.142/transactions/receiving-interbank',
    timeout: 5000
  })

  instance.interceptors.request.use(
    config => {
      config.headers.x_partner_code = partner_code
      return config
    },
    error => {
      console.log("error ne", error)
      return Promise.reject(error)
    }
  )


  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.resolve({ error });
  });

  const response = await instance({
    method: 'post',
    url: '',
    data
  })

  if (response && !response.error) {
    let resp={...response.data};
    let entity = {
      Amount: transactionAmount,
      Fromaccount: paymet[0].Id,
      FromName:name[0].Fullname,
      Toaccount: toAccountId,
      ToName:toFullName,
      Content,
      Date: moment().format('YYYY-MM-DD HH:mm:ss'),
      Sign: resp.data.digital_sign,
      Bank: "PGP",
    }
    await customnerModel.addtransaction(entity);
    if(feeBySender===true){
      await customnerModel.updatepayment({ Amount: (parseInt(paymet[0].Amount) - parseInt(transactionAmount)-1000).toString() }, { Id: paymet[0].Id });
    }else {
      await customnerModel.updatepayment({ Amount: (parseInt(paymet[0].Amount) - parseInt(transactionAmount)).toString() }, { Id: paymet[0].Id });
    }
    
    res.status(200).json(response.data);
  } else {
    if (response && response.error && response.error.response && response.error.response.status) {
      throw createError(401, response.error.response.data.msg);
      // res.status(response.error.response.status).json(response.error.response.data)
    }
  }

})

///TEST///


module.exports = router;