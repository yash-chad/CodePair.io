const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./db/mysql");

const app = express();

const userRouter = require("./routes/user");

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// morgan
app.use(morgan("tiny"));

// cors
app.use(cors());

// --- Routes
app.use("/api/users", userRouter);

app.get("/getUsers", (req, res) => {
  console.log("Hereeeeee");
  let sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
