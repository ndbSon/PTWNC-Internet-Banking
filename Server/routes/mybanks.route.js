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


router.post('/detailRSA', async (req, res) => {
  const timeStamp = Date.now();
  const partnerCode = "baoSon123"; // SAPHASANBank
  const bodyJson = { accountNumber: req.body.customerId };
  const signature = timeStamp + bodyJson + md5("dungnoiaihet");
  let result = await axios({
    method: 'post',
    url: 'http://192.168.43.92:5000/api/external/customer', // link ngan hang muon chuyen toi
    data: { accountNumber: req.body.customerId },
    headers: {
      ts: timeStamp,
      partnerCode: partnerCode,
      hashedSign: md5(signature),
    },
  });
  if (!result) {
    return res.status(404).end();
  } else {
    return res.json(result.data);
  }
})

router.post("/transfersRSA", async (req, res) => {
  var { Id, amount, Content } = req.body;
  let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
  const timeStamp = moment().unix() * 1000;
  const partnerCode = "baoSon123";
  const bodyJson = {
    accountNumber: Id,
    amount: amount,
    Content: Content,
    fromaccount: paymet[0].Id
  };
  const signature = timeStamp + bodyJson + md5("dungnoiaihet");
  const keyRSA = `-----BEGIN RSA PRIVATE KEY-----
  MIICXQIBAAKBgQCVs3ps7aQFOVra4xFDW903snkxN6ffqWb4cSZDQ8gziiscX6NU
  Wsi0oUSjXUS1/xnxwsnMd/q2wsGN+yIFFkJGVRwk9AfUTiT02A0WehlAWMsW/iTx
  /9MIKrmqXQXz7+3vWydwRAaM6nD6e2hL/YFUZRhcso+YYUH+ltCxfQ9hcQIDAQAB
  AoGAPqf+J7VXHzCgTFkZkp3Se0th2i23P6/Bf16sax7lnlzIKnoE/Ht64c9V0SJq
  bdo127BxkfjtoKznIivoU0S7u9uxvrAsDwALgBZShPfb3ID6H1X4FYNNtt55O5Ew
  ifQwboZtL/VveCVUyKA2omn8ObWAfP5pcxcCXIM2SJQDr6ECQQDW4UFDAl5lv5ZZ
  plpYO0dZv++KSjD34CxnnHuZlPGCmUsrFzckIgejZfY4PLvoB07EN0akmPo6Ei5G
  Cr96hcdlAkEAslkuJlQIPvGyUrMCcUNhRg+Joh0PNWzuM73pnyxKVtW6BML7HIA3
  D49WkZw95J9f+RKjkca+s6a3+rxQ2PdvHQJBALRz9LeOfLHcBCqDfmmMVq4zdrne
  9mKj+waELnRa1bsEe1DTrTYF8f4xuWWe83q28FntxcCiy7kK3ZtqmUUOpdUCQApe
  SOKNjBUss/M+2OuAwUzzZkr4aYPvm0GCzuwkBQZbUn8oXrTfd1P+P0gjzy1VXpz6
  SmwVI80J6jQ3cnPKnrkCQQDIKshFkESbKC2Cmeodgvs5p6eAi633tD08bZAcT49E
  k2alF+GcswCQZl/oUiPr5lyI4gAdL7XGZLSDdk8jT0vr
  -----END RSA PRIVATE KEY-----`
  const privateKey = new NodeRSA(keyRSA);
  const sign = privateKey.sign(bodyJson, "base64", "base64");

  let result = await axios({
    method: 'post',
    url: 'http://192.168.43.92:5000/api/external/transaction', // link ngan hang muon chuyen toi
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
  if (result.data) {
    const sign = result.data.sign;
    const keyRSA = `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyceITLtFoy4KzMgmr6NEnvk1VBH7pRuyyg7IkXc3kBspKs9CIErm2eJtEtduIPQK+3AgiQW+fjL1dDMQr7ENZiGzWhEPoSbU348mjg1fxFDztFB4QiqAd7UUvj1kK2/UT+D0C6Sgc0O69C9lRGahPSAX+7ZArGIodtfuOKPenEwIDAQAB-----END PUBLIC KEY-----`
    const keyPublic = new NodeRSA(keyRSA);
    var veri = keyPublic.verify("SAPHASANBank", sign, "base64", "base64");
    if (veri) {
      let entity = {
        Amount: amount,
        Fromacount: paymet[0].Id,
        Content: Content,
        Toacount: Id,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Sign: result.data.sign,
        Bank: "SAPHASANBank",
      }
      await banksModel.addtransaction(entity)
      return res.json(true);
    } else {
      return res.status(404).end();
    }
  } else {
    return res.status(404).end();
  }
});


///TEST///


router.post('/detailPGP', async (req, res) => {
  console.log("body   ", req.body)
  let data = {
    id: req.body.id
  };
  let resinfo = await axios({
    method: 'post',
    url: 'https://ptwncinternetbanking.herokuapp.com/banks/detail', // link ngan hang muon chuyen toi
    data: data,
    headers: {
      'nameBank': 'SAPHASANBank',
      'ts': moment().unix(),
      'sig': hash(moment().unix() + data.id + "secretkey")
    }
  });
  console.log("nhan dcuo: ", resinfo.data)
  if (!resinfo) {
    return res.status(404).json({ info: false });
  } else {
    return res.status(201).json(resinfo.data);
  }
})

router.post('/transferPGP', async (req, res) => {
  let paymet = await banksModel.detail({ Iduser: req.tokenPayload.userId });
  const privateKeyArmored = fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8'); // encrypted private key

  const passphrase = `baoson123`; // what the private key is encrypted with

  const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);
  const { data: cleartext } = await openpgp.sign({
    message: openpgp.cleartext.fromText("NHÓM 6"), // CleartextMessage or Message object
    privateKeys: [privateKey]                     // for signing
  });
  let data = {
    Id: req.body.Id,
    Amount: req.body.Amount,
    Content:req.body.Content,
    Fromacount:paymet[0].Id
  };

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
  if (!result) {
    return res.status(404).end();
  } else {
    return res.json(result.data);
  }
})

///TEST///


module.exports = router;