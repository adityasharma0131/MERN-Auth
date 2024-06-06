const express = require("express");
const router = express.Router();
const User = require("./DB");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Replace 'your_secret_key' with your actual secret key
const JWT_SECRET = 'your_secret_key';

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  try {
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log the valid user
    console.log("Valid user:", user);

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
