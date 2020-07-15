const bcrypt = require('bcryptjs');
const randToken = require('rand-token');
const userModel = require('./user.model');
const db = require('../utils/db');

module.exports = {
  login: async entity => {
    // entity = {
    //   "Name": "admin",
    //   "Password": "admin"
    // }
    const rows = await userModel.detail({Name:entity.Name});
    if (rows.length === 0)
      return null;
      
    const Pwd = rows[0].Password;
    if (bcrypt.compareSync(entity.Password, Pwd)) {
      return rows[0];
    }
    return null;
  },

  signup: async (entity)=>{
    const Name = await userModel.detail({Name: entity.Name});
    const Email = await userModel.detail({Email: entity.Email});
    if(Name.length==0 && Email.length==0){
      let result = await db.add(entity,'users');
      console.log("result ",result)
      const Id = randToken.generate(16,"0123456789");
      let ac ={ Id:Id,
                Iduser: result.insertId,
                Amount:"0"}
      await db.add(ac,'accountpayment');
    }else if(Name.length !=0){
      return 1;
    }else if(Email.length !=0){
      return 2;
    }
  },

  updateRefreshToken: async (userId, token) => {
    return db.update({RefreshToken:token},{Id:userId},'users')
  },

  verifyRefreshToken: async (userId, token) => {
    // console.log("userId: ",userId," token: ",token)
    const sql = `select * from users where Id = ${userId} and RefreshToken = '${token}'`;
    const rows = await db.load(sql);
    // console.log("rows: ",rows)
    if (rows.length > 0){
      return rows[0];
    }
    return false;
  },

  verifySendOTP : async entity =>{
    const Name = await userModel.detail({Name:entity.Name});
    console.log("N: ",Name[0].Email)
    if(Name.length==0){
      return false;
    }else{
      if(Name[0].Email==entity.email){
        return true;
      }
    }
    return false;
    
    
  }
};