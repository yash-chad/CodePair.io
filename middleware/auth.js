const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const db = require("../db/mysql");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtSecret);

    db.query(
      `SELECT * FROM user WHERE user_id = ${decoded.user_id}`,
      (error, result) => {
        if (error || !result.length) {
          throw error;
        } else {
          req.user = result[0];
        }
      }
    );
    next();
  } catch (err) {
    return res.status(400).send({ error: "Please Authenticate!" });
  }
};

module.exports = { auth };
