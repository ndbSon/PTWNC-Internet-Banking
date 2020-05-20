const express = require('express');
const userModel = require('../models/user.model');
var hash = require('object-hash');
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
  let sigcompare = hash(data.ts + data.body + "secretkey");
  //kiểm tra thời gian
  /////.....
  if (data.sig === sigcompare) {
    res.json({ s: "thông tin user" });
  }
  res.json({ s: "thông tin user" });
})

/// passphrase :baoson123 PGP

router.post('/transfers', async (req, res) => {
  let data= req.body;
  
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