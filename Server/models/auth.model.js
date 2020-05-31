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
    if ( Pwd.localeCompare(entity.Password)===0) {
      return rows[0];
    }
    return null;
  }
};