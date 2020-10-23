const mysql = require("mysql");
const { dbUser, dbHost, dbName, dbPassword } = require("../config");

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySql Connected");
  }
});

module.exports = db;
