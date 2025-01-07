const jwt = require('jsonwebtoken'); // Import the JWT library for token verification
const User = require('../models/userModel'); // Import the User model to fetch user details
const dotenv = require('dotenv'); // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from the .env file

// @desc    Middleware to authenticate the user
// @access  Protected (requires a valid JWT token)
const protect = async (req, res, next) => {
  // Read the JWT token from the cookies
  const token = req.cookies.jwt;

  // Check if the token exists
  if (token) {
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user details from the database and exclude the password field
      req.user = await User.findById(decoded.userId).select('-password');

      // Call the next middleware or controller
      next();
    } catch (error) {
      // Respond with a 401 Unauthorized status if token verification fails
      res.status(401).json({ message: "Not Authorised, token failed" });
    }
  } else {
    // Respond with a 401 Unauthorized status if no token is provided
    res.status(401).json({ message: "Not Authorised, no token" });
  }
};

// Export the middleware for use in routes
module.exports = protect;
