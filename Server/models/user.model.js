const db = require('../utils/db');

module.exports = {
  all: _ => db.load('select * from user'),
  
  detail: conditon => db.detail(conditon,'users'),
  
  updateRefreshToken: async (userId, token) => {
    return db.update({RefreshToken:token},{Id:userId},'users')
  },

  verifyRefreshToken: async (userId, token) => {
    const sql = `select * from users where Id = ${userId} and RefreshToken = '${token}'`;
    const rows = await db.load(sql);
    if (rows.length > 0)
      return true;

    return false;
  }
};