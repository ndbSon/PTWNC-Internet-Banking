const express = require('express');
const userModel = require('../models/user.model');
var hash = require('object-hash');
const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();



router.post('/detail', async (req, res) => {
  let data =
  {
    nameBank: req.header('nameBank'),
    ts: req.header('ts'),
    sig: req.header('sig'),
    id: req.body.id,
  };
  let sigcompare = hash(data.ts + data.id + "secretkey"); //secretkey 
  if (data.ts <= moment().unix() + 1500) {
    if (data.sig === sigcompare) {
      // query de lay du lieu tra ve info
      let ID = data.id
      return res.json({ info: "thông tin user" + ID });
    }
  }
  res.status(404).json({ info: false });
})

/// passphrase :baoson123 PGP

router.post('/transfers', async (req, res) => {
  const publicKeyArmored = fs.readFileSync(path.join(__dirname, '../public/Key/publicKeyPGP.asc'), 'utf8');
  let data =
  {
    nameBank: req.header('nameBank'),
    ts: req.header('ts'),
    sig: req.header('sig'),
    sigpgp: req.header('sigpgp'),
    body: req.body
  };
  let sigcompare = hash(data.ts + data.body + "secretkey"); //secretkey 
  if (data.ts <= moment().unix() + 1500) {
    if (data.sig === sigcompare) {
      // console.log("signpgp: ",JSON.parse(data.sigpgp))
      const verified = await openpgp.verify({
        message: await openpgp.cleartext.readArmored(JSON.parse(data.sigpgp)),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
      });
      const { valid } = verified.signatures[0];
      if (valid) {
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
        // tao chu ky pgp
        const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/Key/privateKeyPGP.asc'), 'utf8'); // encrypted private key
        const passphrase = `baoson123`; // what the private key is encrypted with
        const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);

        await privateKey.decrypt(passphrase);
        const { data: cleartext } = await openpgp.sign({
          message: openpgp.cleartext.fromText("Nhom 6"), // CleartextMessage or Message object
          privateKeys: [privateKey]    // for signing
        });

        return res.json({ sign: cleartext, account: "baoson", amount: 200000 });
      } else {
        return res.status(404).json({ info: false });
      }
    }
  }
  return res.status(404).json({ info: false });
})

router.post('/123', async (req, res) => {
  const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/privateKeyPGP.asc'), 'utf8'); // encrypted private key
  const passphrase = `baoson123`; // what the private key is encrypted with
  const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);

  await privateKey.decrypt(passphrase);
  let con = req.body;
  const { data: cleartext } = await openpgp.sign({
    message: openpgp.cleartext.fromText("hello"), // CleartextMessage or Message object
    privateKeys: [privateKey]                     // for signing
  });
  console.log(cleartext);


  res.json(cleartext)
})


router.post('/detailPGP', async (req, res) => {
  console.log("body   ", req.body)
  let data = {
    id: req.body.id
  };
  let resinfo = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/user/detail', // link ngan hang muon chuyen toi
    data: data,
    headers: {
      'nameBank': 'baoson',
      'ts': moment().unix(),
      'sig': hash(moment().unix() + data.id + "secretkey")
    }
  });
  console.log("nhan dcuo: ", resinfo.data)
  if(!resinfo){
    return res.status(404).json({ info: false });
  }else{
    return res.status(201).json(resinfo.data);
  }
})

router.post('/transferPGP', async (req, res) => {
  const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/Key/privateKeyPGP.asc'), 'utf8'); // encrypted private key
  const passphrase = `baoson123`; // what the private key is encrypted with
  const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);
  const { data: cleartext } = await openpgp.sign({
    message: openpgp.cleartext.fromText("NHÓM 6"), // CleartextMessage or Message object
    privateKeys: [privateKey]                     // for signing
  });
  let data = {
    id: req.body.id,
    amount : req.body.amount
  };
  let resinfo = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/user/transfers', // link ngan hang muon chuyen toi
    data: data,
    headers: {
      'nameBank': 'baoson',
      'ts': moment().unix(),
      'sig': hash(moment().unix() + data + "secretkey"),
      'sigpgp': JSON.stringify(cleartext),
    }
  });
  console.log("nhan dcuo: ", resinfo.data)
  if(!resinfo){
    return res.status(404).end();
  }else{
    return res.json(resinfo.data);
  }
})

module.exports = router;