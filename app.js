const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const notesRouter = require("./routes/notes");
const pusherRouter = require("./routes/pusher");
const contentRouter = require("./routes/content");

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
app.use("/api/room", roomRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pusher", pusherRouter);
app.use("/api/content", contentRouter);

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
