const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const config = require('../config/default.json');

const verifyToken =(token)=>{
  let payload = jwt.verify(token, config.auth.secret);
  return payload;
}

const customer = (req, res, next)=> {
  const token = req.headers['x-access-token'];
  if (token) {
    let payload= verifyToken(token);
    if(payload.Permission==1){
      req.tokenPayload = payload;
      next();
    }else{
      throw createError(401, 'No Permission');
    }
  } else {
    throw createError(401, 'No accessToken found.');
  }
}
const employee = (req, res, next)=> {
  const token = req.headers['x-access-token'];
  if (token) {
    let payload= verifyToken(token);
    if(payload.Permission==2){
      req.tokenPayload = payload;
      next();
    }else{
      throw createError(401, 'No Permission');
    }
  } else {
    throw createError(401, 'No accessToken found.');
  }
}
const admin = (req, res, next)=> {
  const token = req.headers['x-access-token'];
  if (token) {
    let payload= verifyToken(token);
    if(payload.Permission==3){
      req.tokenPayload = payload;
      next();
    }else{
      throw createError(401, 'No Permission');
    }
  } else {
    throw createError(401, 'No accessToken found.');
  }
}
module.exports ={
  customer,
  employee,
  admin
}