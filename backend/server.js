const express = require("express");  // Import express framework
const dotenv = require("dotenv");  // Import dotenv to load environment variables from .env file
const path = require('path');  // Import path module to handle file paths
const connectDb = require("./config/connectDb");  // Import database connection function
const movieRoutes = require("./routes/movie.routes.js");  // Import movie routes
const seriesRoutes = require("./routes/series.routes.js");  // Import TV series routes
const homeRoutes = require("./routes/home.routes.js");  // Import home route
const userRoutes = require("./routes/user.routes.js");  // Import user routes
const bookmarkRoutes = require("./routes/bookmark.routes.js");  // Import bookmark routes
const cookieParser = require("cookie-parser");  // Import cookie parser to parse cookies in requests
const cors = require("cors");  // Import cors middleware

dotenv.config();  // Load environment variables from .env file
const app = express();  // Initialize an Express app

const port = process.env.PORT || 5000;  // Set port, use the value from .env or default to 5000

// Configure CORS middleware
const corsOptions = {
  origin: "https://frontend-entertainment.onrender.com",  // Allow requests from your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
  credentials: true,  // Allow cookies to be sent
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Use the defined routes for different API endpoints
app.use("/api/home", homeRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tvseries", seriesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// Production environment setup
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();  // Resolve current directory path
  app.use('/uploads', express.static('/var/data/uploads'));  // Serve static files from the uploads directory in production
  app.use(express.static(path.join(__dirname, '/frontend/build')));  // Serve static files from the frontend build folder

  // Fallback route for handling all other routes (Single Page Application)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();  // Resolve current directory path
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));  // Serve static files from the uploads directory in development
  app.get('/', (req, res) => {
    res.send('API is running....');  // Simple message for development
  });
}

// Connect to the database
connectDb();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
