const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");
const db = require("../db/mysql");

// Get all rooms from the db
router.get("/getRooms", auth, (req, res) => {
  let sql = "SELECT * FROM room";
  db.query(sql, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Create a new Room
router.post("/createRoom", auth, async (req, res) => {
  if (!req.body.room_name) {
    return res.send({
      Error: "Please insert all fields",
    });
  }

  const room_id = parseInt(new Date().valueOf() / 10000);
  // Creating a room Instance
  db.query(
    `INSERT INTO ROOM (room_id,room_name,admin) VALUES("${room_id}","${req.body.room_name}",${req.user.user_id})`,
    async (error, result) => {
      if (error) {
        return res.status(400).send({
          Error: error,
        });
      } else {
        // Adding the admin to the room
        db.query(
          `INSERT INTO UserRoomDetails(room_id,user_id) values(${room_id},${req.user.user_id});`,
          (error, result) => {
            if (error) {
              res.send({
                Error: error,
              });
            } else {
              return res.status(201).send({
                success: "New room created",
                room_id,
              });
            }
          }
        );
      }
    }
  );
});

// Join room with id
router.get("/joinRoom/:room_id", auth, async (req, res) => {
  if (!req.params.room_id) {
    return res.status(400).send({
      Message: "Room id required",
    });
  }

  db.query(
    `SELECT count(*) AS count FROM UserRoomDetails WHERE user_id="${req.user.user_id}" AND room_id="${req.params.room_id}"`,
    (error, result) => {
      if (error) {
        res.status(400).send({ Error: error });
      } else {
        if (result[0].count) {
          return res
            .status(200)
            .send({ message: "User aldready exists in room" });
        } else {
          // Adding the user if it does not exists
          db.query(
            `INSERT INTO UserRoomDetails(room_id,user_id) values(${req.params.room_id},${req.user.user_id});`,
            (error, result) => {
              if (error) {
                res.status(400).send({
                  Error: error,
                });
              } else {
                res
                  .status(200)
                  .send({ success: "Successfully joined the room" });
              }
            }
          );
        }
      }
    }
  );
});

// Returns all the participants in the room
router.get("/getParticipants/:room_id", auth, async (req, res) => {
  if (!req.params.room_id) {
    return res.status(400).send({
      Message: "Room id required",
    });
  }
  db.query(
    `SELECT u.user_id ,u.first_name , u.last_name FROM user u, userRoomDetails ud WHERE room_id = ${req.params.room_id} AND u.user_id = ud.user_id;`,
    (error, result) => {
      if (error) {
        res.send({
          Error: error,
        });
      } else {
        res.send(result);
      }
    }
  );
});

// Give the name/details of the room
router.get("/getRoomName/:room_id", auth, async (req, res) => {
  if (!req.params.room_id) {
    return res.status(400).send({
      Message: "Room id required",
    });
  }
  db.query(
    `SELECT room_name FROM room WHERE room_id=${req.params.room_id}`,
    (error, result) => {
      if (error) {
        res.send({
          Error: error,
        });
      } else {
        res.send(result[0]);
      }
    }
  );
});

//Returns the rooms you have been a part of
router.get("/getMyRooms", auth, async (req, res) => {
  db.query(
    `SELECT * FROM room WHERE room_id IN (SELECT room_id FROM userRoomDetails ud WHERE user_id=${req.user.user_id}) `,
    (error, result) => {
      if (error) {
        res.send({
          Error: error,
        });
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
