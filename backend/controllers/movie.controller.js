// @desc    Fetches all popular movies
// @route   GET /api/movies
// @access  Public
const getAllMovies = async (req, res) => {
  try {
    // Extract 'keyword' query parameter from the request
    const { keyword } = req.query;

    // Fetch the list of popular movies from TMDB API
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
    );

    // Check if the response from the API is successful
    if (!response.ok) {
      throw new Error('Failed to fetch movies'); // Throw an error if the fetch fails
    }

    // Parse the API response into JSON format
    const data = await response.json();
    const movies = data.results; // Extract the 'results' array containing movies

    // If no keyword is provided, return the full list of movies
    if (!keyword) {
      return res.status(200).json(movies); // Send all movies as the response
    }

    // Convert the keyword to lowercase for case-insensitive filtering
    const lcKeyword = keyword.toLowerCase();

    // Filter the movies based on whether their title contains the keyword
    const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(lcKeyword));

    // Send the filtered movies as the response
    res.status(200).json(filteredMovies);
  } catch (error) {
    // Handle errors and send a 500 status code with an error message
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// @desc    Fetches details of a specific movie by its ID, including cast
// @route   GET /api/movies/:id
// @access  Public
const getMoviebyId = async (req, res) => {
  try {
    // Extract the movie ID from the route parameters
    const id = req.params.id;

    // Fetch the movie's cast information from TMDB API
    const castArray = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API}`
    )
      .then((res) => res.json()) // Parse the API response into JSON format
      .then((data) => data.cast) // Extract the 'cast' array from the response
      .then((cast) => cast.filter((c) => c.known_for_department === "Acting")) // Filter for actors only
      .then((cast) => (cast.length > 10 ? cast.slice(0, 10) : cast)); // Limit the cast array to the top 10 actors

    // Fetch the movie details, including videos and images, from TMDB API
    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
    ).then((res) => res.json());

    // If the movie is found, send the movie details and cast information
    if (movie) {
      res.status(200).json({ movie: movie, cast: castArray });
    } else {
      // Send a 404 status code if the movie is not found
      res.status(404).json({ message: "movie not found" });
    }
  } catch (error) {
    // Handle errors and send a 400 status code with the error message
    res.status(400).send(error.message);
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllMovies,
  getMoviebyId,
};
