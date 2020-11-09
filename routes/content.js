const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");
const db = require("../db/mysql");

// Route to get Content from the db
router.get("/getContent/:room_id", auth, async (req, res) => {
  if (!req.params.room_id) {
    return res.send({
      Error: "Please insert room id",
    });
  }
  db.query(
    `SELECT text FROM PLAINTEXT WHERE ROOM_ID=${req.params.room_id}`,
    (error, result) => {
      if (error) {
        return res.send({ Error: error });
      } else {
        if (!result.length) return res.send({ text: "" });
        else return res.send(result[0]);
      }
    }
  );
});

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

//Routr to set triggers
router.get("/setTriggers", auth, (req, res) => {
  try {
    // INsert TRigger
    let success_count = 0;
    db.query(
      `delimiter //
  CREATE TRIGGER insert_check BEFORE INSERT ON PLAINTEXT
         FOR EACH ROW
         BEGIN
              IF NEW.text = "" THEN
          SIGNAL SQLSTATE '45000'
                  SET MESSAGE_TEXT = "Oops! You cannot save Null Text";
        END IF;
         END;
  // delimiter;`,
      (error, result) => {
        if (error) {
          throw error;
        } else {
          success_count++;
        }
      }
    );

    // Update Trigger
    db.query(
      `delimiter //
    CREATE TRIGGER update_check BEFORE UPDATE ON PLAINTEXT
           FOR EACH ROW
           BEGIN
                IF NEW.text = "" THEN
            SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = "Oops! You cannot save Null Text";
          END IF;
           END;
    // delimiter ;`,
      (error, result) => {
        if (error) {
          throw error;
        } else {
          success_count++;
          if (success_count == 2)
            res.send({ Success: "Triggers added successfully" });
          else res.send({ Error: "Error ocured" });
        }
      }
    );
  } catch (e) {
    res.send(error);
  }
});

module.exports = router;
