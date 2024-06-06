var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require("./DB");

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  // Check if user is logged in by checking a session or token
  // For this example, let's assume you have a session or token-based authentication
  // You can replace this with your actual authentication logic
  
  // Example: Check if the user is logged in using session
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // User is authenticated, proceed to the next middleware or route handler
  next();
};

/* GET home page. */
router.get('/', authenticateUser, function(req, res, next) {
  res.json({
    message: "API is working"
  });
});

router.post("/signin", async function (req, res, next) {
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

    // For this example, let's assume you set a session after successful login
    // req.session.user = user;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async function (req, res, next) {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
