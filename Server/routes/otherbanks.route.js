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


const router = express.Router();

router.post('/detail', async (req, res) => {
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
      let info = await banksModel.detailname(data.Id)
      console.log("info: ", info[0])
      return res.json({ info: info[0].Name });
    }
  }
  res.status(404).json({ message: false });
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
  const publicKeyArmored = fs.readFileSync(path.join(__dirname, `../public/PGP/${data.nameBank}.asc`), 'utf8');
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

        const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8'); // encrypted private key
        const passphrase = `baoson123`; // what the private key is encrypted with
        const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);

        await privateKey.decrypt(passphrase);
        const { data: cleartext } = await openpgp.sign({
          message: openpgp.cleartext.fromText("NGANHANGBAOSON"), // CleartextMessage or Message object
          privateKeys: [privateKey]    // for signing
        });
        let paymet = await banksModel.detail({ Id: data.body.Id });
        let tmoney = parseInt(paymet[0].Amount) + data.body.Amount;
        let entity = {
          Amount: data.body.Amount,
          Fromaccount: data.body.Fromaccount,
          Content: data.body.Content,
          Toaccount: data.body.Id,
          Date: moment().format('YYYY-MM-DD HH:mm:ss'),
          Sign: data.sigpgp,
          Bank: data.nameBank,
        }
        await banksModel.addtransaction(entity)
        await banksModel.update({ Amount: tmoney.toString() }, { Id: data.body.Id });
        return res.json({ sign: cleartext });
      } else {
        return res.status(404).json({ info: false });
      }

    }
  }

  return res.status(404).json({ info: false });
});
///TEST///


module.exports = router;