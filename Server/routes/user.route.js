const express = require('express');
const userModel = require('../models/user.model');
var hash = require('object-hash');
const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
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
    body: req.body,
  };
  let sigcompare = hash(data.ts + data.body + "secretkey"); //secretkey 
  if(ts<=moment().unix()-150){
    if (data.sig === sigcompare) {
      // query de lay du lieu tra ve info
      res.json({ info: "thông tin user" });
    }
  }
  res.status(404).json({ info: false });
})

/// passphrase :baoson123 PGP

router.post('/transfers', async (req, res) => {
  const publicKeyArmored = fs.readFileSync(path.join(__dirname, '../public/Key/publicKeyPGP.asc'),'utf8');
  let data =
  {
    nameBank: req.header('nameBank'),
    ts: req.header('ts'),
    sig: req.header('sig'),
    sigpgp: req.header('sigpgp'),
    body: req.body
  };
  let sigcompare = hash(data.ts + data.body + "secretkey"); //secretkey 
  if(ts<=moment().unix()-150){
    if (data.sig === sigcompare) {
      const verified = await openpgp.verify({
        message: await openpgp.cleartext.readArmored(req.body.sigpgp),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
      });
      const { valid } = verified.signatures[0];
      if (valid) {
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
        // tao chu ky pgp
        const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/privateKeyPGP.asc'),'utf8'); // encrypted private key
        const passphrase = `baoson123`; // what the private key is encrypted with
        const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);

        await privateKey.decrypt(passphrase);
        const { data: cleartext } = await openpgp.sign({
        message: openpgp.cleartext.fromText("hello"), // CleartextMessage or Message object
        privateKeys: [privateKey]    // for signing
        });                  
       
        res.json({sign: cleartext});
      } else {
        res.status(404).json({ info: false });
      }
    }
    res.status(404).json({ info: false });
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