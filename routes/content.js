const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");
const db = require("../db/mysql");

// A route for saving text Content to the db
router.post("/saveContent", auth, async (req, res) => {
  if (!req.body.room_id || !req.body.text) {
    return res.send({
      Error: "Please insert all fields",
    });
  }

  db.query(
    `SELECT COUNT(*) AS count FROM PLAINTEXT WHERE ROOM_ID =${req.body.room_id}`,
    (error, result) => {
      if (result[0].count) {
        // Updating the data as it aldready exists
        db.query(
          `UPDATE plainText SET text="${req.body.text}" WHERE room_id = ${req.body.room_id}`,
          async (error, result) => {
            if (error) {
              return res.status(400).send({
                Error: error,
              });
            } else {
              return res.status(201).send({
                success: "Text saved!!",
              });
            }
          }
        );
      } else {
        // Saving data if it does not exists
        db.query(
          `INSERT INTO plainText(text,room_id) VALUES("${req.body.text}",${req.body.room_id})`,
          async (error, result) => {
            if (error) {
              return res.status(400).send({
                Error: error,
              });
            } else {
              return res.status(201).send({
                success: "Text Saved!!",
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;