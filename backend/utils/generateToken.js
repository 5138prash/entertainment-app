const jwt = require("jsonwebtoken");  // Import the jsonwebtoken package for creating JWT tokens

// Function to generate a JWT token and set it as an HTTP-only cookie
const generateToken = (res, userId) => {
    // Create a token with the user's ID, using the secret from the environment variables
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",  // The token will expire in 1 day
    });

    // Set the JWT token in a cookie with the necessary configurations
    res.cookie("jwt", token, {
        httpOnly: true,  // Ensure the cookie is only accessible via HTTP requests (not accessible by JavaScript)
        secure: process.env.NODE_ENV === "production",  // Use secure cookies in production (HTTPS)
        sameSite: "strict",  // Prevent cross-site request forgery (CSRF) attacks
        maxAge:30 * 24 * 60 * 60 * 1000,, // Set the cookie's expiration time to 1 day in milliseconds
    });
};

module.exports = generateToken;  // Export the function for use in other files
