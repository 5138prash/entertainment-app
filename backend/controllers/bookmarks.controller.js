// Import the Bookmark model for interacting with the bookmarks collection in MongoDB
const Bookmark = require("../models/bookmarkModel");

/**
 * @desc    Creates a bookmark for a specific user and item.
 * @route   POST /api/bookmarks
 * @access  Private
 * @param   {Object} req - The HTTP request object.
 * @param   {Object} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const createBookmark = async (req, res) => {
    try {
        // Destructure required and optional fields from the request body
        const {
            user,
            itemId,
            backdrop_path,
            title,
            name,
            release_date,
            first_air_date,
        } = req.body;

        // Ensure both user and itemId are provided in the request
        if (!user || !itemId) {
            return res.status(400).json({ message: "User and itemId are required" });
        }

        // Check if the bookmark already exists for the user and itemId
        const bExist = await Bookmark.findOne({ user, itemId });

        if (bExist) {
            // If bookmark exists, respond with an appropriate message
            res.status(400).json({ message: "Item already bookmarked" });
        } else {
            // Create a new bookmark instance
            const newBookmark = new Bookmark({
                user,
                itemId,
                backdrop_path,
                title,
                name,
                release_date,
                first_air_date,
            });

            // Save the bookmark to the database
            const savedBookmark = await newBookmark.save();

            // Respond with the saved bookmark
            res.status(201).json(savedBookmark);
        }
    } catch (error) {
        // Handle server errors and respond with an error message
        res
            .status(500)
            .send({ message: "Failed to create bookmark", error: error.message });
    }
};

/**
 * @desc    Fetch items bookmarked by a specific user.
 * @route   GET /api/bookmarks/:userId
 * @access  Private
 * @param   {Object} req - The HTTP request object.
 * @param   {Object} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const getBookmarks = async (req, res) => {
    try {
        // Extract keyword from query parameters and userId from route parameters
        const { keyword } = req.query;
        const regex = new RegExp(keyword, "i"); // Case-insensitive regex for keyword matching
        const { userId } = req.params;

        // Validate userId
        if (!userId || userId === "undefined") {
            return res.status(400).json({
                message:
                    "Invalid or missing User ID, Kindly Login to access your Bookmarks",
            });
        }

        if (!keyword) {
            // Fetch all bookmarks for the user if no keyword is provided
            const bookmarks = await Bookmark.find({ user: userId });
            res.status(200).json(bookmarks);
        } else {
            // Fetch bookmarks that match the keyword in either name or title
            const searchedBookmarks = await Bookmark.find({
                user: userId,
                $or: [{ name: { $regex: regex } }, { title: { $regex: regex } }],
            });

            res.status(200).json(searchedBookmarks);
        }
    } catch (error) {
        // Log errors and respond with a failure message
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ message: "Failed to fetch bookmarks", error });
    }
};

/**
 * @desc    Deletes a bookmarked item.
 * @route   DELETE /api/bookmarks/delete
 * @access  Private
 * @param   {Object} req - The HTTP request object.
 * @param   {Object} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const deleteBookmark = async (req, res) => {
    try {
        // Extract the request body containing deletion criteria
        const body = req.body;

        // Find and delete the bookmark that matches the criteria
        await Bookmark.findOneAndDelete(body);

        // Respond with a success message
        res.status(200).json({ message: "Successfully Removed" });
    } catch (error) {
        // Handle server errors and respond with an error message
        res.status(500).json({ message: "Unable To Remove from Bookmarks" });
    }
};

// Export the bookmark controller functions for use in routes
module.exports = {
    createBookmark,
    getBookmarks,
    deleteBookmark,
};
