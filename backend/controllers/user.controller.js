const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Authenticate user & generate token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists and if the password matches
    if (user && (await user.matchPassword(password))) {
      // Generate a token and store it in a cookie
      generateToken(res, user._id);

      // Respond with user details
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      // Respond with an error if authentication fails
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // Handle errors and send a 400 status code
    res.status(400).json({ message: error?.message });
  }
};

// @desc    Logout user and clear the cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = async (req, res) => {
  try {
    // Clear the JWT cookie by setting it to an empty string and setting an expired date
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Respond with a success message
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    // Handle errors and send a 500 status code
    res.status(500).json({ message: "Failed to logout" });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Respond with an error if the user already exists
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in the database
    const user = await User.create({ name, email, password });

    // Generate a token for the new user and store it in a cookie
    generateToken(res, user._id);

    // Respond with the new user's details
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // Handle errors and send a 400 status code
    res.status(400).json({ message: error.message });
  }
};

// Export the functions for use in routes
module.exports = {
  authUser,
  logoutUser,
  registerUser,
};
