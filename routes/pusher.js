const { Router } = require("express");
const router = Router();
const Pusher = require("pusher");
require("dotenv").config();

const pusher = new Pusher({
  // connect to pusher
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
});

router.post("/save-text", async (req, res) => {
  if (req.body.text && req.body.text.trim() !== "") {
    await pusher.trigger("editor", "text-update", { text: req.body.text });
    res.status(200).send({ success: true, message: "text broadcasted" });
  } else {
    res.status(400).send({ success: false, message: "text not broadcasted" });
  }
});

router.post("/editor-text", async (req, res) => {
  if (req.body.text) {
    await pusher.trigger("editor", "editor-update", {
      text: req.body.text,
      selection: req.body.selection,
    });
    res
      .status(200)
      .send({ success: true, message: "editor update broadcasted" });
  } else {
    res
      .status(400)
      .send({ success: false, message: "editor update not broadcasted" });
  }
});

module.exports = router;
