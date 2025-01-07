// @desc    Fetches all popular TV series
// @route   GET /api/tvseries
// @access  Public
const getAllSeries = async (req, res) => {
  try {
    // Extract 'keyword' query parameter from the request
    const { keyword } = req.query;

    // Fetch the list of popular TV series from TMDB API
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API}`
    )
      .then((res) => res.json()) // Parse the response into JSON format
      .then((data) => data.results); // Extract the 'results' array containing series

    // If no keyword is provided, return the full list of series
    if (!keyword) {
      return res.status(200).json(data); // Send all TV series as the response
    }

    // Filter the series based on whether their name contains the keyword
    const filteredSeries = data.filter((s) =>
      s.name.toLowerCase().includes(keyword.toLowerCase())
    );

    // Send the filtered series as the response
    res.status(200).json(filteredSeries);
  } catch (error) {
    // Handle errors and send a 500 status code with an error message
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetches details of a specific TV series by its ID, including cast
// @route   GET /api/tvseries/:id
// @access  Public
const getSeriesById = async (req, res) => {
  try {
    // Extract the series ID from the route parameters
    const { id } = req.params;

    // Fetch the cast information for the TV series from TMDB API
    const castArray = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API}`
    )
      .then((res) => res.json()) // Parse the response into JSON format
      .then((data) => data.cast) // Extract the 'cast' array from the response
      .then((cast) => cast.filter((c) => c.known_for_department === "Acting")) // Filter for actors only
      .then((cast) => (cast.length > 10 ? cast.slice(0, 10) : cast)); // Limit the cast array to the top 10 actors

    // Fetch the series details, including additional information, from TMDB API
    const series = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API}`
    ).then((res) => res.json());

    // If the series is found, send the series details and cast information
    if (series) {
      res.status(200).json({ series: series, cast: castArray });
    } else {
      // Send a 404 status code if the series is not found
      res.status(404).json({ message: "Series not found" });
    }
  } catch (error) {
    // Handle errors and send a 500 status code with an error message
    res.status(500).json({ message: error.message });
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllSeries,
  getSeriesById,
};
