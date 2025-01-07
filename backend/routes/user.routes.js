const express = require('express')  // Import the express module
const router = express.Router()    // Create a new router instance

// Import the functions that handle user-related requests
const { 
  authUser,    // Function to authenticate the user and generate a token
  logoutUser,  // Function to log out the user and clear the cookie
  registerUser // Function to register a new user
} = require('../controllers/user.controller')

// Define the POST route for authenticating the user
// When a POST request is made to "/auth", it calls the authUser function
router.post('/auth', authUser)  // POST /api/users/auth - Authenticates user & gets token

// Define the POST route for logging out the user
// When a POST request is made to "/logout", it calls the logoutUser function
router.post('/logout', logoutUser)  // POST /api/users/logout - Logs out the user & clears cookie

// Define the POST route for registering a new user
// When a POST request is made to "/", it calls the registerUser function
router.post('/', registerUser)  // POST /api/users - Registers a new user

// Export the router to be used in the main application (app.js or server.js)
module.exports = router
