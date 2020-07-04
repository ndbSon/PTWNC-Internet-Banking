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
const crypto = require('crypto')
const NodeRSA = require('node-rsa');


const router = express.Router();


router.post('/detailRSA', async (req, res) => {
  const timeStamp = Date.now();
  const partnerCode = "baoSon123"; // SAPHASANBank
  const bodyJson = { accountNumber: req.body.customerId };
  const signature = timeStamp + bodyJson + md5("dungnoiaihet");
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
  if (!result) {
    return res.status(404).end();
  } else {
    return res.json(result.data);
  }
})


router.post("/transfersRSA", async (req, res) => {
  var { accountNumber, amount,Content} = req.body; // , Content
  let paymet = await customnerModel.detailpayment({ Iduser: req.tokenPayload.userId });
  const timeStamp = moment().unix() * 1000;
  const partnerCode = "baoSon123";
  const bodyJson = {
    accountNumber: accountNumber,
    amount: amount,
    content: Content,
    sentUserId: paymet[0].Id
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
  console.log("sign: ",result.data)
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
        Toacount: accountNumber,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Sign: result.data.sign,
        Bank: "SAPHASANBank",
      }
      await banksModel.addtransaction(entity)
      return res.json(result.data.message);
    } else {
      return res.status(404).end();
    }
  } else {
    return res.status(404).end();
  }
});

// router.post("/SAPHASANBank/transaction", async (req, res) => {
// 	const timeStamp = Date.now();
// 	const partnerCode = "baoSon123";
// 	const bodyJson = {
// 		accountNumber: req.body.customerId,
// 		amount: req.body.amount,
// 	};
// 	const signature = timeStamp + bodyJson + md5("dungnoiaihet");
// 	const privateKey = new NodeRSA(
// 		`-----BEGIN RSA PRIVATE KEY-----
//     MIICXQIBAAKBgQCVs3ps7aQFOVra4xFDW903snkxN6ffqWb4cSZDQ8gziiscX6NU
//     Wsi0oUSjXUS1/xnxwsnMd/q2wsGN+yIFFkJGVRwk9AfUTiT02A0WehlAWMsW/iTx
//     /9MIKrmqXQXz7+3vWydwRAaM6nD6e2hL/YFUZRhcso+YYUH+ltCxfQ9hcQIDAQAB
//     AoGAPqf+J7VXHzCgTFkZkp3Se0th2i23P6/Bf16sax7lnlzIKnoE/Ht64c9V0SJq
//     bdo127BxkfjtoKznIivoU0S7u9uxvrAsDwALgBZShPfb3ID6H1X4FYNNtt55O5Ew
//     ifQwboZtL/VveCVUyKA2omn8ObWAfP5pcxcCXIM2SJQDr6ECQQDW4UFDAl5lv5ZZ
//     plpYO0dZv++KSjD34CxnnHuZlPGCmUsrFzckIgejZfY4PLvoB07EN0akmPo6Ei5G
//     Cr96hcdlAkEAslkuJlQIPvGyUrMCcUNhRg+Joh0PNWzuM73pnyxKVtW6BML7HIA3
//     D49WkZw95J9f+RKjkca+s6a3+rxQ2PdvHQJBALRz9LeOfLHcBCqDfmmMVq4zdrne
//     9mKj+waELnRa1bsEe1DTrTYF8f4xuWWe83q28FntxcCiy7kK3ZtqmUUOpdUCQApe
//     SOKNjBUss/M+2OuAwUzzZkr4aYPvm0GCzuwkBQZbUn8oXrTfd1P+P0gjzy1VXpz6
//     SmwVI80J6jQ3cnPKnrkCQQDIKshFkESbKC2Cmeodgvs5p6eAi633tD08bZAcT49E
//     k2alF+GcswCQZl/oUiPr5lyI4gAdL7XGZLSDdk8jT0vr
//     -----END RSA PRIVATE KEY-----`
// 	);
// 	const sign = privateKey.sign(bodyJson, "base64", "base64");
// 	await axios
// 		.post('http://localhost:5000/api/external/transaction', bodyJson, {
// 			headers: {
// 				ts: timeStamp,
// 				partnerCode: partnerCode,
// 				hashedSign: md5(signature),
// 				sign: sign,
// 			},
// 		})
// 		.then((result) => {
// 			const { data } = result;
// 			res.json(result.data);
// 			// console.log(result);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			res.json(err.response);
// 		});
// });

///TEST///

//"Id": "2750027628572576"
router.post('/detailPGP', async (req, res) => {
  let data = {
    Id: req.body.Id
  };
  console.log("ID: ",data.Id);
  let resinfo = await axios({
    method: 'post',
    url: 'https://ptwncinternetbanking.herokuapp.com/banks/detail', // link ngan hang muon chuyen toi
    data: data,
    headers: {
      nameBank: 'baoson',
      ts: moment().unix(),
      sig: hash(moment().unix() + data.Id + "secretkey")
    }
  });
  console.log("nhan dcuo: ", resinfo.data)
  if (!resinfo) {
    return res.status(404).json({ info: false });
  } else {
    return res.status(201).json(resinfo.data);
  }
})

// "Id": "2750027628572576",
// 	"Amount":50,
// 	"Content":"nop tien"
// "Fromacount": "123456789" 
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
      nameBank: 'SAPHASANBank',
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


router.get('/getInfo',async function(req,res) {
  const accountId = req.query.accountId;
  console.log("type: ",typeof accountId)
  const partner_code = "nhom6"
  const secret_key = 'day la secret key'
  const passphrase = 'baoson123'
  const partnerPublicKey = fs.readFileSync(path.join(__dirname, '../public/PGP/hoangsang.asc'), 'utf8'); 

  const ourPrivateKey =fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8'); 

  const accountIdHashed = crypto.createHmac('SHA1',secret_key).update(accountId).digest('hex')

  let { data: accountIdEncrypted } = await openpgp.encrypt({
      message: openpgp.message.fromText(accountId),
      publicKeys: (await openpgp.key.readArmored(partnerPublicKey)).keys 
  });

  accountIdEncrypted = accountIdEncrypted.replace(/\r/g,"\\n").replace(/\n/g,"")

  const currentTime =  Math.round((new Date()).getTime())
  const entryTimeHashed = crypto.createHmac('SHA1',secret_key).update(currentTime.toString()).digest('hex')

  let { data: entryTimeEncrypted } = await openpgp.encrypt({
      message: openpgp.message.fromText(currentTime.toString()),
      publicKeys: (await openpgp.key.readArmored(partnerPublicKey)).keys 
  });

  entryTimeEncrypted = entryTimeEncrypted.replace(/\r/g,"\\n").replace(/\n/g,"")

  const { keys: [privateKey] } = await openpgp.key.readArmored(ourPrivateKey)
await privateKey.decrypt(passphrase)

  let { data: digitalSignature } = await openpgp.sign({
      message: openpgp.cleartext.fromText(accountId), // CleartextMessage or Message object
      privateKeys: [privateKey]                             // for signing
  });

  digitalSignature = digitalSignature.replace(/\r/g,"\\n").replace(/\n/g,"")

  console.log(digitalSignature)
  

  let instance = axios.create({
      baseURL: 'http://34.87.97.142/transactions/receiver-interbank',
      timeout: 5000,
      headers: {
          'x_partner_code': partner_code,
          'x_signature': digitalSignature,
          'x_account_id_hashed':accountIdHashed,
          'x_account_id_encrypted':accountIdEncrypted,
          'x_entry_time_encrypted': entryTimeEncrypted,
          'x_entry_time_hashed':entryTimeHashed
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
      method:'get',
      url:''
  })

  if (response && !response.error) {
      res.status(200).json(response.data)
  } else {
      if (response && response.error && response.error.response && response.error.response.status) {
          res.status(response.error.response.status).json(response.error.response.data)
      }
  }

})

router.post('/transferMoney',async function (req,res) {
  const partner_code = "nhom6"
  const secret_key = 'day la secret key'
  const passphrase = 'baoson123'
  const partnerPublicKey = fs.readFileSync(path.join(__dirname, '../public/PGP/hoangsang.asc'), 'utf8'); 
  const ourPrivateKey =fs.readFileSync(path.join(__dirname, '../public/myPGP/privateKeyPGP.asc'), 'utf8'); 
  let paymet = await banksModel.detail({ Iduser: req.tokenPayload.userId });
  let name = await banksModel.detailname(paymet[0].Id);
  let info= {
    ...req.body,
    fromAccountId: paymet[0].Id,
    fromFullName : name[0].Name,
    fromBankId:'nhom6'
}
  let entryTime =  Math.round((new Date()).getTime())
  info.entryTime = entryTime
  const data_hashed = crypto.createHmac('SHA1',secret_key).update(JSON.stringify({
      ...info
  })).digest('hex')
  const { keys: [privateKey] } = await openpgp.key.readArmored(ourPrivateKey)
  await privateKey.decrypt(passphrase)

  let { data: digital_sign } = await openpgp.sign({
      message: openpgp.cleartext.fromText(JSON.stringify(info)), // CleartextMessage or Message object
      privateKeys: [privateKey]                             // for signing
  });

  digital_sign = digital_sign.substring(digital_sign.indexOf('-----BEGIN PGP SIGNATURE-----'),digital_sign.length)
  digital_sign = digital_sign.replace(/\r/g,"\\n").replace(/\n/g,"")

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
      method:'post',
      url:'',
      data
  })

  if (response && !response.error) {
      res.status(200).json(response.data)
  } else {
      if (response && response.error && response.error.response && response.error.response.status) {
          res.status(response.error.response.status).json(response.error.response.data)
      }
  }

})


module.exports = router;