const express = require('express');
const userModel = require('../models/user.model');
var hash = require('object-hash');
const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');
const router = express.Router();


// router.get('/', async (req, res) => {
//   const list = await userModel.all();
//   res.json(list);
// })

router.post('/detail', async (req, res) => {
  let data =
  {
    nameBank: req.header('nameBank'),
    ts: req.header('ts'),
    sig: req.header('sig'),
    body: req.body
  };
  let sigcompare = hash(data.ts + data.body + "secretkey"); //secretkey 
  //kiểm tra thời gian
  /////.....
  if (data.sig === sigcompare) {
    res.json({ s: "thông tin user" });
  }
  res.json({ s: "thông tin user" });
})

/// passphrase :baoson123 PGP

router.post('/transfers', async (req, res) => {
  const publicKeyArmored = fs.readFileSync(path.join(__dirname, '../public/publicKeyPGP.asc'),'utf8');
  // let data =
  // {
  //   nameBank: req.header('nameBank'),
  //   ts: req.header('ts'),
  //   sig: req.header('sig'),
  //   sigpgp: req.header('sigpgp'),
  //   body: req.body
  // };
  // let sigcompare = hash(data.ts + data.body + "secretkey"); //secretkey 

  const verified = await openpgp.verify({
    message: await openpgp.cleartext.readArmored(req.body.sigpgp),           // parse armored message
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
  });
  const { valid } = verified.signatures[0];
  if (valid) {
    console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    res.json("abc");
  } else {
    throw new Error('signature could not be verified');
  }

})

router.post('/123', async (req, res) => {
  const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/privateKeyPGP.asc'),'utf8'); // encrypted private key
  const passphrase = `baoson123`; // what the private key is encrypted with
  const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);

  await privateKey.decrypt(passphrase);
  let con =req.body;
  const { data: cleartext } = await openpgp.sign({
      message: openpgp.cleartext.fromText("hello"), // CleartextMessage or Message object
      privateKeys: [privateKey]                     // for signing
  });
  console.log(cleartext);


  res.json(cleartext)
})


router.post('/', async (req, res) => {
  // const results = await categoryModel.add(req.body);
  // const ret = {
  //   CatID: results.insertId,
  //   ...req.body
  // }
  // res.status(201).json(ret);

  res.status(201).end();
})

module.exports = router;