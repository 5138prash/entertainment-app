// Import the mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

/**
 * Asynchronous function to establish a connection to the MongoDB database.
 * @returns {Promise<void>} Resolves if the connection is successful, otherwise logs an error and exits the process.
 */
const connectDb = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true, // Ensures compatibility with the MongoDB driver's new URL parser
            useUnifiedTopology: true, // Enables the new server discovery and monitoring engine
        });

        console.log('Database connection established successfully'); // Log success message for monitoring
    } catch (error) {
        // Log any connection errors to the console for debugging
        console.error('Database connection failed:', error);

        // Exit the process with a failure code to indicate a critical error
        process.exit(1);
    }
};

// Export the connectDb function for use in other parts of the application
module.exports = connectDb;