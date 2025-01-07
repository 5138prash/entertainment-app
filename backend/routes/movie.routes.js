const express = require("express"); // Import the express module

const router = express.Router(); // Create a new router instance

// Import the functions that handle movie-related requests
const {
  getAllMovies, // Function to get all movies
  getMoviebyId  // Function to get a movie by its ID
} = require('../controllers/movie.controller');

// Define the GET route for fetching all movies
// When a GET request is made to the root ("/"), it calls the getAllMovies function
router.get("/", getAllMovies); // GET /api/movies - Fetches all movies

// Define the GET route for fetching a movie by its ID
// When a GET request is made to "/:id", it calls the getMoviebyId function
// The ":id" is a route parameter representing the movie's ID
router.get("/:id", getMoviebyId); // GET /api/movies/:id - Fetches a movie by ID

// Export the router to be used in the main application (app.js or server.js)
module.exports = router;
