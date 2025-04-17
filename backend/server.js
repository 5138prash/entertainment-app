const express = require("express"); // Import express framework
const dotenv = require("dotenv"); // Import dotenv to load environment variables from .env file
const path = require("path"); // Import path module to handle file paths
const connectDb = require("./config/connectDb"); // Import database connection function
const movieRoutes = require("./routes/movie.routes.js"); // Import movie routes
const seriesRoutes = require("./routes/series.routes.js"); // Import TV series routes
const homeRoutes = require("./routes/home.routes.js"); // Import home route
const userRoutes = require("./routes/user.routes.js"); // Import user routes
const bookmarkRoutes = require("./routes/bookmark.routes.js"); // Import bookmark routes
const cookieParser = require("cookie-parser"); // Import cookie parser to parse cookies in requests
const cors = require("cors"); // Import cors middleware

dotenv.config(); // Load environment variables from .env file
const app = express(); // Initialize an Express app

const port = process.env.PORT || 5000; // Set port, use the value from .env or default to 5000

// Configure CORS middleware
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent
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


  if(process.env.NODE_ENV === "production"){
  const rootDir = path.resolve(__dirname, ".."); // Go up to the project root

  // Serve static files from the build directory of the frontend
  app.use(express.static(path.join(rootDir, "frontend", "build")));

  // Fallback route for Single Page Application (SPA)
  app.get("*", (req, res) =>
    res.sendFile(path.join(rootDir, "frontend", "build", "index.html"))
  );
} else {
  // Development route for API
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Connect to the database
connectDb();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
