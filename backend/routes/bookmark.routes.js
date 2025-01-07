const express = require("express"); // Import Express library
const router = express.Router(); // Create a new router instance

// Import the controller functions for handling bookmark operations
const {
  createBookmark, // Function to create a new bookmark
  getBookmarks, // Function to retrieve all bookmarks for a user
  deleteBookmark, // Function to delete a bookmark
} = require('../controllers/bookmarks.controller');

// Import the middleware for authentication (protect route)
const protect = require('../middlewares/authMiddleware');

// Route for creating a new bookmark
// This route is protected, meaning the user must be authenticated
router.post("/", protect, createBookmark); // POST /api/bookmarks - Calls the createBookmark controller

// Route for getting all bookmarks of a specific user
// This route is also protected, meaning the user must be authenticated
router.get("/:userId", protect, getBookmarks); // GET /api/bookmarks/:userId - Calls the getBookmarks controller

// Route for deleting a bookmark
// This route is protected, meaning the user must be authenticated
router.delete("/delete", protect, deleteBookmark); // DELETE /api/bookmarks/delete - Calls the deleteBookmark controller

module.exports = router; // Export the router for use in the main app
