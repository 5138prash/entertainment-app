const express = require("express"); // Import the express module
const router = express.Router(); // Create a new router instance

// Import the home controller that handles the logic for the home route
const homeController = require('../controllers/home.controller');

// Define the GET route for the home page
// When a GET request is made to the root ("/"), it calls the homeController function
router.get("/", homeController); // GET / - Calls the homeController to handle the request

// Export the router to be used in the main application (app.js or server.js)
module.exports = router;
