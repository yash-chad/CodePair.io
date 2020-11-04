const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");
const db = require("../db/mysql");

// Create a note for a particular room for the current user
router.post("/createNote", auth, async (req, res) => {
  if (!req.body.data || !req.body.room_id) {
    return res.send({
      Error: "Please insert all fields",
    });
  }
  db.query(
    `INSERT INTO Notes(data,room_id,user_id) values("${req.body.data}",${req.body.room_id},${req.user.user_id})`,
    async (error, result) => {
      if (error) {
        return res.status(400).send({
          Error: error,
        });
      } else {
        return res.status(201).send({
          success: "New note added",
        });
      }
    }
  );
});

// Update a Note
router.put("/updateNote", auth, async (req, res) => {
  if (!req.body.data || !req.body.note_id) {
    return res.send({
      Error: "Please insert all fields",
    });
  }
  db.query(
    `UPDATE NOTES SET DATA ="${req.body.data}" WHERE note_id=${req.body.note_id}`,
    async (error, result) => {
      if (error) {
        return res.status(400).send({
          Error: error,
        });
      } else {
        return res.status(201).send({
          success: "Note Updated",
        });
      }
    }
  );
});

//Gives all notes by the specific user in the requeted room
router.post("/getNotes", auth, (req, res) => {
  if (!req.body.room_id) {
    return res.send({
      Error: "Please insert all fields",
    });
  } else {
    db.query(
      `SELECT data FROM NOTES WHERE user_id = ${req.user.user_id} AND room_id = ${req.body.room_id}`,
      async (error, result) => {
        if (error) {
          return res.status(400).send({
            Error: error,
          });
        } else {
          return res.status(201).send(result);
        }
      }
    );
  }
});

// Delete Note
router.delete("/deleteNote", auth, (req, res) => {
  if (!req.body.note_id) {
    return res.send({
      Error: "Please insert all fields",
    });
  } else {
    db.query(
      `DELETE FROM NOTES WHERE note_id=${req.body.note_id}`,
      async (error, result) => {
        if (error) {
          return res.status(400).send({
            Error: error,
          });
        } else {
          return res.status(201).send({
            success: "Note Deleted",
          });
        }
      }
    );
  }
});

module.exports = router;
