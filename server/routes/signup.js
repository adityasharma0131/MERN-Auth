const express = require("express");
const router = express.Router();
const User = require("./DB");
const bcryptjs = require('bcryptjs');

router.post("/", async function (req, res, next) {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password:hashedPassword });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
