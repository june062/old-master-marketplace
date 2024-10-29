const { Pool } = require("pg");
const { argv } = require("node:process");

function returnConnectionInfo() {
  if (process.env.NODE_ENV == "dev") {
    return {
      host: process.env.DB_HOST_DEV,
      user: process.env.DB_USER_DEV,
      database: process.env.DB_DEV,
      password: process.env.DB_PASSWORD_DEV,
    };
  } else {
    return {
      host: process.env.DB_HOST_PROD,
      user: process.env.DB_USER_PROD,
      database: process.env.DB_PROD,
      password: process.env.DB_PASSWORD_PROD,
    };
  }
}
const connectionInfo = returnConnectionInfo();

module.exports = new Pool(connectionInfo);
