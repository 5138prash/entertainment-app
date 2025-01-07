const express = require("express"); // Import the express module

const router = express.Router(); // Create a new router instance

// Import the functions that handle series-related requests
const {
  getAllSeries,  // Function to get all series
  getSeriesById  // Function to get a series by its ID
} = require('../controllers/series.controller');

// Define the GET route for fetching all series
// When a GET request is made to the root ("/"), it calls the getAllSeries function
router.get("/", getAllSeries); // GET /api/tvseries - Fetches all TV series

// Define the GET route for fetching a series by its ID
// When a GET request is made to "/:id", it calls the getSeriesById function
// The ":id" is a route parameter representing the series's ID
router.get("/:id", getSeriesById); // GET /api/tvseries/:id - Fetches a series by ID

// Export the router to be used in the main application (app.js or server.js)
module.exports = router;
