require("dotenv").config();

module.exports = {
  saltRounds: process.env.saltRounds,
  jwtSecret: process.env.jwtSecret,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};
