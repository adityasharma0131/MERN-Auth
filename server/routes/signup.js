var express = require("express");
var router = express.Router();
const User = require("./DB");

router.post("/", async function (req, res, next) {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: "User Created Successfully!" });
});

module.exports = router;
