const mongoose = require('mongoose'); // Import the Mongoose library to interact with MongoDB

// Define the schema for bookmarks
const bookmarkSchema = mongoose.Schema(
  {
    // Reference to the user who created the bookmark
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the user's ObjectId from the User collection
      ref: 'User', // Establishes a reference to the User model
      required: true, // This field is mandatory
    },
    // ID of the bookmarked item (movie or TV series)
    itemId: {
      type: Number, // Stores the unique ID of the movie or TV series
      required: true, // This field is mandatory
    },
    // Backdrop image path for the bookmarked item
    backdrop_path: {
      type: String, // Stores the URL or path of the backdrop image
      required: true, // This field is mandatory
    },
    // Title of the bookmarked item (if it's a movie)
    title: {
      type: String, // Stores the title of the movie
    },
    // Name of the bookmarked item (if it's a TV series)
    name: {
      type: String, // Stores the name of the TV series
    },
    // Release date of the movie (if applicable)
    release_date: {
      type: String, // Stores the release date as a string
    },
    // First air date of the TV series (if applicable)
    first_air_date: {
      type: String, // Stores the first air date as a string
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields to the document
    timestamps: true,
  }
);

// Create the Bookmark model using the schema
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// Export the Bookmark model to use it in other parts of the application
module.exports = Bookmark;
