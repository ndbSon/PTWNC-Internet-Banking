const express = require('express');
const banksModel = require('../models/banks.model');
var hash = require('object-hash');
const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const axios = require('axios');
const md5 = require('md5');
const NodeRSA = require('node-rsa');
const createError = require('http-errors');
const MyPGP = require('../public/myPGP/keyPGP.json');
const PGP = require('../public/PGP/key.json');
const router = express.Router();

router.post('/detail', async (req, res) => {
  console.log("req data: ", req.body);
  let data =
  {
    nameBank: req.header('nameBank'),
    ts: req.header('ts'),
    sig: req.header('sig'),
    Id: req.body.Id,
  };
  // if(data.nameBank!="SAPHASANBank"){
  //   return res.json({message:false});
  // }

  let sigcompare = hash(data.ts + data.Id + "secretkey"); //secretkey 

  if (data.ts <= moment().unix() + 1500) {
    if (data.sig === sigcompare) {
      // query de lay du lieu tra ve info
      let result = await banksModel.detailname(data.Id)
      console.log("result: ", result[0])
      if (result.length === 0) {
        throw createError(401, "not found");
      }
      return res.json({ result: result[0] });
    }
  }
  throw createError(401, "not found");
})

/// passphrase :baoson123 PGP

router.post("/transfers", async (req, res) => {
  let data =
  {
    nameBank: req.header('nameBank'),
    ts: req.header('ts'),
    sig: req.header('sig'),
    sigpgp: req.header('sigpgp'),
    body: req.body,
  };
  var publicKeyArmored = ""
  if (data.nameBank == "Eight Bank") {
    publicKeyArmored = PGP.EightBank;
  } else if (data.nameBank == "SAPHASANBank") {
    publicKeyArmored = PGP.SAPHASANBank;
  } else if (data.nameBank == "baoson") {
    publicKeyArmored = PGP.baoson;
  }
  let sigcompare = hash(data.ts + data.body + "secretkey"); //secretkey 
  if (data.ts <= moment().unix() + 1500) {
    if (data.sig === sigcompare) {
      const verified = await openpgp.verify({
        message: await openpgp.cleartext.readArmored(JSON.parse(data.sigpgp)),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
      });
      const { valid } = verified.signatures[0];
      if (valid) {
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());

        const privateKeyArmored = MyPGP.privateKeyPGP; // encrypted private key
        const passphrase = `baoson123`; // what the private key is encrypted with
        const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);

        await privateKey.decrypt(passphrase);
        const { data: cleartext } = await openpgp.sign({
          message: openpgp.cleartext.fromText("NGANHANGBAOSON"), // CleartextMessage or Message object
          privateKeys: [privateKey]    // for signing
        });
        let paymet = await banksModel.detail({ Id: data.body.Id });
       
        let entity = {
          Amount: data.body.Amount,
          Fromaccount: data.body.Fromaccount,
          Content: data.body.Content,
          Toaccount: data.body.Id,
          FromName: data.body.FromName,
          ToName: data.body.ToName,
          Date: moment().format('YYYY-MM-DD HH:mm:ss'),
          Sign: data.sigpgp,
          Bank: data.nameBank,
        }
        await banksModel.addtransaction(entity)
        if(data.body.feeBySender===true){
          await customnerModel.updatepayment({ Amount: (parseInt(paymet[0].Amount) + parseInt(data.body.Amount)).toString() }, { Id: paymet[0].Id });
        }else{
          await customnerModel.updatepayment({ Amount: (parseInt(paymet[0].Amount) + parseInt(data.body.Amount)-1000).toString() }, { Id: paymet[0].Id });
        }
        return res.json({ sign: cleartext });
      } else {
        throw createError(401, "Sign PGP invalid");
      }

    } else {
      throw createError(401, "Sign is invalid");
    }
  } else {
    throw createError(401, "Time Late");
  }
}
);
///TEST///


//"Id": "2750027628572576"
router.post('/detailPGP', async (req, res) => {
  let data = {
    Id: req.body.Id
  };
  console.log("ID: ", data.Id);
  try {
    let result = await axios({
      method: 'post',
      url: 'https://ptwncinternetbanking.herokuapp.com/banks/detail', // link ngan hang muon chuyen toi
      data: data,
      headers: {
        nameBank: 'baoson',
        ts: moment().unix(),
        sig: hash(moment().unix() + data.Id + "secretkey")
      }
    });
    console.log("nhan dcuo: ", result.data)
    return res.status(201).json(result.data);
  } catch (error) {
    console.log("error: ", error.response.data)
    throw createError(401, error.response.data.err)
  }

})

// "Id": "2750027628572576",
// 	"Amount":50000,
// 	"Content":"nop tien"
// "Fromaccount": "123456789"  Số tài khoản người gửi
// "FromName":"nguyen van abc",
// "ToName": "abcscas"
// "feeBySender":true or false
router.post('/transferPGP', async (req, res) => {
  // let paymet = await banksModel.detail({ Iduser: req.tokenPayload.userId });
  const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8'); //my private key PGP

  const passphrase = `baoson123`; // what the private key is encrypted with

  const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);
  const { data: cleartext } = await openpgp.sign({
    message: openpgp.cleartext.fromText("NHÓM 6"), // CleartextMessage or Message object
    privateKeys: [privateKey]                     // for signing
  });
  let data = {
    ...req.body,
    //   Fromacount:paymet[0].Id // so tai khoan nguoi gui
  };
  try {
    let result = await axios({
      method: 'post',
      url: 'https://ptwncinternetbanking.herokuapp.com/banks/transfers', // link ngan hang muon chuyen toi
      data: {
        ...data
      },
      headers: {
        nameBank: 'baoson',
        ts: moment().unix(),
        sig: hash(moment().unix() + data + "secretkey"),
        sigpgp: JSON.stringify(cleartext)
      },
    });
    return res.status(200).json(result.data);
  } catch (error) {
    console.log("error: ", error.response.data)
    throw createError(401, error.response.data.err)
  }

})


module.exports = router;