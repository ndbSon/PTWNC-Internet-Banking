const express = require('express');
const banksModel = require('../models/banks.model');
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

//"Id": "2750027628572576"
router.post('/detailPGP', async (req, res) => {
  console.log("body   ", req.body)
  let data = {
    id: req.body.Id
  };
  let resinfo = await axios({
    method: 'post',
    url: 'https://ptwncinternetbanking.herokuapp.com/banks/detail', // link ngan hang muon chuyen toi
    data: data,
    headers: {
      nameBank: 'baoson',
      ts: moment().unix(),
      sig: hash(moment().unix() + data.id + "secretkey")
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



 
// const ourPrivateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----\n`+
// `Version: Keybase OpenPGP v1.0.0\n`+
// `Comment: https://keybase.io/crypto\n\n`+
// `xcFGBF7JkqYBBADdKOT2kIjCY0yizPMprkAtUNRfxTtm2jf7UaNQuUwDuEO0qMka\n`+
// `A9eJVUb1sBF7Yz1VqrygpSzHQ8SJRPWED+ZXOm08EQdiVtMM6tszwp6R0CVMmV88\n`+
// `CO3w3dhb5QnIh72vEhgwLagQ4ay33YtZ5I3yd8Y+6A3vbEfMxC+5aQnOawARAQAB\n`+
// `/gkDCGLby75M1Gf2YEB09pjpK36UpS+cZtQVYdlJ6+2BFZppJ/iuk2dzM5WjPi/t\n`+
// `smPV0u5oSVHFaQ7PvytBqIZSCeXWOlJEyR2N24ip9VPrkQN/BsRjf6RO9+fg3fG5\n`+
// `MPwLFUKmLfbcGtA2QLihKiIBf2pwDHPyyk7BvFL8F6xDbz1IJcsaWT3Hrv2KFFU0\n`+
// `Xqv8WS1KbFxkJroAGbdLbXwBkjUBzXMs6SpY8cYV1BCPlFbJo/LsWYnksvzmH9cL\n`+
// `8j0zELnvzi97xxdx1HTGLErrJWIxv31KEn50QmfFBltCpPsMg6d+tTFXxI/ogSMb\n`+
// `hdhAdvGqtObQSPhaw9lUTqaqAxB52BtS/tT9JhD5kAvhsSJBvHOV4C+iRlTjy93z\n`+
// `pe/QnSs8fD1ezw4pvh8H+8qHfyLj6Ywf+eLR4MyCvS2wryzp5jNAMaBC4cimyGUP\n`+
// `1MBm+piaprMz0dABfPEx7KuLNLxsnuaEcOUavNXQvu29WUerqdP5oZ/NJ0zDqiBI\n`+
// `b8OgbmcgU2FuZyA8bGhzYW5naGNtdXNAZ21haWwuY29tPsKtBBMBCgAXBQJeyZKm\n`+
// `AhsvAwsJBwMVCggCHgECF4AACgkQpzXoBsADgAeNAgQAn1KCMWb8cjmuuVZviaif\n`+
// `LJkXfkOpd4Id9U1M9U1q09dp6no/l/mQ1G7WhCyT3wxcestmlkcc40Bqcl3QnavH\n`+
// `QSzEQ3ZK5dPwPAPGa+a0Lt01U6JD1wCKJz08HruQT1UIh8js9B9dpu0VqdBr1tNX\n`+
// `yKrIKypUiRB8QEN6K22iOEnHwUYEXsmSpgEEALsTgzzYVH9BJC1Z3Uy4yZ8q/OIg\n`+
// `FXg7jw1vUE76Q0OAFE2p6A0BeFFrak6wWVfwAx0RtONFYHvUMZc1ldT4W1vAPRyt\n`+
// `mfwqk2f1to30wIfN6lx7G6a3NKPTQA4OGtdTbu3YBsAksdS7lBe58lGTB9KlmkU/\n`+
// `nm7znEKbDEqFt9AxABEBAAH+CQMI/U1UsZKh2OFg+TxBAwUtvSQdsS/Cz/9cdE03\n`+
// `qOr8wxaZP4UwuhsfELtiUd7CNaZ5FBUBYmoCaz5caFSl0BivyqQM5usTyRIxFasj\n`+
// `KwePpOq9j4pVMYZFvzNLIKW6aIwk/uxqaeWJeD3+Jff52GLoz33XRuFq9Oiddewf\n`+
// `k08qqoWQ2+iCI1t07tzHOGW2rDhNY9GxHlP41PPbsGjePfop4LzYioUkawPYEyC/\n`+
// `6QKNxAYxnQxY6+WAA/0AmMNrVZg6DGc7bFUP5iJFyaEl7INs5f49oDwF1o4w6b9I\n`+
// `7ogTi9ivcirT9Z7PrkjgXBtSTMW0i9jIT+TbybgRs3YzfpQX+9fTufjVxwHk1l7/\n`+
// `ByI+EldXNEfjNBvZrqJ3qKGa1A+xUwNlMsoxQR2DneMXjbv5D90geIn1G1d3YEXk\n`+
// `XobbMSc6GN+TzC/eR1pPCh7px48cenV+KDoEpj82fwKNTBsETBARv9TYf5weqfKg\n`+
// `5apwraBEw3L/gcLAgwQYAQoADwUCXsmSpgUJDwmcAAIbLgCoCRCnNegGwAOAB50g\n`+
// `BBkBCgAGBQJeyZKmAAoJEM4BOwbPLQd3GwgD/RLUYYK1BxGC9oZpv2b2xGSpB+kN\n`+
// `JHW4za9veNkaBrt9l5cP7k7jRlnwXIAnRZ7fTZN04ZTMvAuU7Kgw8pZaccuxBILN\n`+
// `3jSb/WG2V/Q/hoVzH4izuVOUfJjs3EK+aO1l4+MuvZoAf1bI5EbwbXrnhgqQvr0Q\n`+
// `I/DBPDV1t4uepHnZAtMEAK3LurI4dlZIDiyjJrkNHmc9GMe3N9ouhtriCsGQq8BT\n`+
// `ux4ZG94rOQaKnPohqNEx8nHZYXR2vDxgvMfSDrvO0ftD5um4OyfWXWm3gGwc9oS8\n`+
// `Io3+UzKN2hRz1Fm5pukX7a44iKqG0dGN/F3DYoeldxI/Jg0qKqeSxZbsbil/lSjq\n`+
// `x8FGBF7JkqYBBAD63IZrtZmnrHtnzAbYUy45tBHBLhXAbHVqJhIFAzw/xU0BopSi\n`+
// `HpTSvsZqN5GdZOeJh5pSQLll72P8tjMfaf1f47k9TF/lLWeZt61xkCVGZUlyK3DX\n`+
// `FeYnHmrHFhLCgO/mtqIfDn/mfJWlvyF2cyipbtIWpKlD+x1SPAO1aeyfHwARAQAB\n`+
// `/gkDCE9qjBjxGFcUYGQv87f4DV93vgxUqOy3w5Z2BGJMMTpkPS4RE+EuL8hfNLW+\n`+
// `1k7w+Sj8fJ2BQBz/Jy66m7o8EBcFt/qVGTKHmfHPsQp49lbFaQpeg7BgjBNQfBMd\n`+
// `8qwMnnbOrdkcye0q0l6tZR0xWljMuJ1FsXvxQT+V+RmvyIo2Ee4w61+bAldGT07m\n`+
// `aHrlyY2wLrOhTtKglBc3z9W4CIGzbinkf0/IT+1ky70qNTJCSvL+LdH0VbVKD2Co\n`+
// `T0MUZVNQEwQl0ZITV8ivsGXisKS01zYl96nblatO5H1oH1TvA44EwLSFL3+wggqI\n`+
// `NQcpCOJVx2Q2tLiyzOCOalNNtm3N+kia336zbqQlmsGiFPReYlkmSK/OxycsFRn8\n`+
// `mDGq/iN2/iOLYBDsAE6Z3BnhyD3Frt79yC9NpyApvsTzSqni73oCzXr5ZZPlv+C3\n`+
// `fAhnOJd4z9HRWHCVDFU8UhZHYLPZ1dFiq0FRWfBy+eIE60doLjE9RAzCwIMEGAEK\n`+
// `AA8FAl7JkqYFCQ8JnAACGy4AqAkQpzXoBsADgAedIAQZAQoABgUCXsmSpgAKCRDm\n`+
// `te8LAcTm+z1vBACnSC/oiazB5T4OHgCweAZndegV/hqNHow4quVNpJQmQQPnrpBK\n`+
// `9NFM9kjlw2ZYANW024D273s7vAN7GsHXyPYGc6b7TygF8ZplXopTYRkNC9iKRM/A\n`+
// `SLZ+gQGT8Xm1y6VWjU0Lqp7AjBS/iCp/z2rYcIb/aCeJSoenccNhj3gTFscpBAC6\n`+
// `LXiOf4h2cvPY9c1ojqgjJknVWYm6e6Csggz7Nr0s8tC47mNmBmRQcf4Jv0CAoIr3\n`+
// `NVWMAmz2B0iTZ3JRi89pNpX1ZUi81QQMpO/wDvuLGXCf2um0u4W/ay4VgtPmi9hH\n`+
// `aLkf+1Y4g2WafW951V0ZW0RicXw399ufijjbp8CnJg==\n`+
// `=outc\n`+
// `-----END PGP PRIVATE KEY BLOCK-----\n`

// const partnerPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----\n`+
// `Version: Keybase OpenPGP v1.0.0\n`+
// `Comment: https://keybase.io/crypto\n\n`+
// `xsBNBF7Jj8cBCAC8vii5BAqkdfVsx45AEiOTmU5OoIzvGKHqXy/4bt8f2DMHclcd\n`+
// `m5U/0vqzLsSPqSqZbFj2f2/O7KLH/gpuNo57MtnBCOLegjw9CczAGhZQdlaHazaf\n`+
// `K1vf/aEby1sHDjje9xjagcs+0OWFLNyE7+3H4nofP2Mb/GVaXH+LYSKbUFa05YLv\n`+
// `51x2x6zmwtPoFy6r7j8ZMDqV+ASJiDQceK0cF8vsF9TkMTe770eT3EpGfMIRZgqw\n`+
// `CrKw6JXVx+YM1aVSkIWrgdhNyoACKC4FnSIkyiQTTpYeovJRW9hWrs3SQLXm7Kcs\n`+
// `XO0+jlSLszGA6XeT1Fge1pQHpOJ0ubMKJ0KZABEBAAHNJ0zDqiBIb8OgbmcgU2Fu\n`+
// `ZyA8bGhzYW5naGNtdXNAZ21haWwuY29tPsLAbQQTAQoAFwUCXsmPxwIbLwMLCQcD\n`+
// `FQoIAh4BAheAAAoJEDOb8vBxZ/JikMAH/iLljqpUk+Ge6jlmvnuRJDW853gYOMEq\n`+
// `0YLs20g/ykSz6u7bwjKKUunfsTcZ831DsRsT8RVitvK5lgCESH5KSIWAdE1Vdj4S\n`+
// `zKukEHnR7Dddfy9FNOUQ9cm8PaqKJ06bRJ5sSFsZTmitvi/Kq6bI3WbyWKBULHnh\n`+
// `uc6MdCN5bECvgGV4hjwnFdHfm6rSw4zPfjjYfoOjkFgKh2EEc21WZY8/BAHHYox3\n`+
// `KjTZ7xlqA/8jL8yFNWUTHNIj4rbZ+B+v0pTRSx//UJzP+vCiPUjuQ2cfjrGr1bXG\n`+
// `G53ZwcP19FUc13rYCxc0B8x3oe1saIa3x69zWkYdYU/o97Fat1ori5fOwE0EXsmP\n`+
// `xwEIAL7Zab3zJmQRwz3w/TX6Iq/2/ctECoiORfpd2jAHM7Jpxj3/wFS/gMSXqCHL\n`+
// `nkVuHXIe5qTsT28agRDPgqlFW4E5DM2Xg/34PGCCUv6V62H5JvE2wMOPVII3AX/k\n`+
// `6MFGeFaaf38Z/VNSywSD1mSPuXBUI5IcZjlKmUvsmOvKcMj565Gz+3zVTKHnDVHN\n`+
// `p2uwzDbISpAQyJbjCN3Pccw3OPMu3pS4NhQdd8rBN09iFaVeFPPzymUC8f2VlVy2\n`+
// `qZXfCoqLUPg75Msp9eTXHp04S8Xxs3H2w30Tc1bbTxYWoR0jpn8m1v2HHrkdraJd\n`+
// `LXqFYaQuEcEScxc2ypCznBIg8t0AEQEAAcLBhAQYAQoADwUCXsmPxwUJDwmcAAIb\n`+
// `LgEpCRAzm/LwcWfyYsBdIAQZAQoABgUCXsmPxwAKCRC8EwaMESMWSlJ9B/4zNF7j\n`+
// `eEP1heKtnIDtC378B0phR1M9xYM5DTmV0Y16qhtTz93dBuetp071mulz4OJxxLa9\n`+
// `ntDpXthds472w0aPB1C0MyU+ZVUd4fe0OOKjmqthBLL4og4I+EKILkSS5bTxpg/a\n`+
// `RPsd8la6SEiDdQaMcB/HJPPlaBD34tVR5Vk0s+KQKJi1HGRP8qusgo5O6RtAB/F8\n`+
// `PyexqCwwCstFw5ZWfA95/QKGz3o7PuBpd1TLHnxPSBLdbUm2r1vREIFdbjPHDPUb\n`+
// `cp9zwMhy642w296/CwJF7Uff/wTFXvlJH7mIMUOW3ZXriXKexHVg/2EnwqsNnJEh\n`+
// `nn5hJPvgjW5XPNyKXOAH/j3i2YbmrQCeuaK66Y8JLiL2DjSj86FZmo6Qj0RznzWj\n`+
// `bgX9BrjcmTIm7oxhGUbo15uruKu10fyZh+2HbeuCL47xU6uMb3yC1HQ/VXL0jjON\n`+
// `RD2BD0y6kGyFYuGQd2Pv43i+ONemuqMmg4gHQYtwFiwXGKlzf7kHG8UdEf/+JQD+\n`+
// `PgvlJZDOf78uiWFjY5fAG4GWqE0Xor9vwyb+Jvwh7UK4CKPuQfGhN75gj/G5i4Vd\n`+
// `KDPMRvsTOq1Dqxum7uu9ggiiVq6Mi09CeMNu+58u5A64iPNUcW9YqBpTGJlBah29\n`+
// `KxobadMa2KPB4O7d5qqJYmAn9WCJS6oYv867Lajcbq/OwE0EXsmPxwEIANfKKjFG\n`+
// `uT6boZy8Q90RuiEnNaq6U8VYSO+rP8p1L/bkruHP34Viu/FcFnmVShZgi6Ue69+r\n`+
// `WkRYljSmBlvGs6PhWK8pOIT8qDFg4IiE8OheCcOQpOgSWpDPmtyi3CHl5UgF2kD1\n`+
// `kG25EQmrZYYaF6w/v4GKZQ7UY+39ez1vXspwFw+FMvIDI8u7o+HzJqJWvu5YfFNe\n`+
// `irw91Kz9BhwVlMtrGI06ji59rseccBIzQfNcttQzQMFK+eNLg0WW4idForObGAVN\n`+
// `o5sUQXE6xh5ULr0Q2yxdmvEngK2dPU/8S9cBmJ58x7vpLU5fuTHDUpL1JkMcNylu\n`+
// `v40MHyTOOzUjJksAEQEAAcLBhAQYAQoADwUCXsmPxwUJDwmcAAIbLgEpCRAzm/Lw\n`+
// `cWfyYsBdIAQZAQoABgUCXsmPxwAKCRDUddLs2GedBg7iB/9JXerc90doE2VlUNBB\n`+
// `oonneSETI/AtWglP4y4jd7a+05f8KD3djFBL+DRvGarMiHU310hbQnRjyLmOJNNb\n`+
// `tBBEQ0X4kpmA8WwrQ83RfHapXXfCy0OHS81b46rrIGTXiCw2hBCfcRVZ5Np7Nf5G\n`+
// `UlVDae1GXECIsIcIAbgq/y/dhQzoxNU0YwHp+wMx+Rvxp1FI6qXm3iE+XIh2+GaY\n`+
// `AI+ZGYPDkaotoqGLYUQF4K2xzOVbmO7roMJD5kUnLMALsATRBpWcpp5rhKbPqRZy\n`+
// `gVKSZFKkKmM9+3jKCZw+YltFEE0X9N4b1gfgb8/oC7c/q/dmHjUIyWrnbKoQYuJr\n`+
// `te49iNkIAJxUSxMbeyemfb11rRJZspwBT7qfa1Osc7SQdLTR+MwhiM/AfA7Q86Kv\n`+
// `g4r5exkS/wG4FdKRJdB+mubRJr4b2vDVzwAcjTN1CzbNtiTLrpLJZN2C/ZC/nkY6\n`+
// `M/rGv8mA/6cxHgjGhx7/HmW6N+S10WIog4rUHQpTQ4vZHexCFxrRKzN4HDArZbu+\n`+
// `WmCFnfTAqRyDuEjXojyJb0BeXu31PFVliCZ0ag74wo29PK0t5bGCzc/sKeh1bKZH\n`+
// `HTncQqSlzHC0qDT09vOvVTv8zzmQsAit4bG6ixt2t8oCLmhV3aaQiu5Ko0cwdA7e\n`+
// `aWsFa5FTZM6nd8ohBThLdSvOoFxip5w=\n`+
// `=zEGz\n`+
// `-----END PGP PUBLIC KEY BLOCK-----`

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