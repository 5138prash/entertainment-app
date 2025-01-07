// Define an asynchronous controller function for handling requests to the home route
const homeController = async (req, res) => {
  // Extract the 'keyword' query parameter from the request
  const { keyword } = req.query;

  try {
      // Fetch popular movies from the TMDB API
      const movies = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
          .then((res) => res.json()) // Parse the JSON response
          .then((data) => data.results); // Extract the 'results' array

      // Fetch trending movies for the week from the TMDB API
      const trendingMovies = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
          .then((res) => res.json()) // Parse the JSON response
          .then((data) => data.results); // Extract the 'results' array

      // Fetch popular TV shows from the TMDB API
      const tv = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
          .then((res) => res.json()) // Parse the JSON response
          .then((data) => data.results); // Extract the 'results' array

      // Fetch trending TV shows for the week from the TMDB API
      const trendingTv = await fetch(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
          .then((res) => res.json()) // Parse the JSON response
          .then((data) => data.results); // Extract the 'results' array

      // Combine trending TV shows and movies into a single array
      const trending = [...trendingTv, ...trendingMovies];

      // Combine popular movies and TV shows into a recommendation list
      const recommend = [...movies, ...tv];

      // Check if a 'keyword' query parameter is provided
      if (!keyword) {
          // If no keyword, return the complete recommend and trending lists
          res.status(200).json({ recommend: recommend, trending: trending });
      } else {
          // Filter movies by the keyword (case-insensitive search in title)
          const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(keyword.toLowerCase()));

          // Filter TV shows by the keyword (case-insensitive search in name)
          const filteredSeries = tv.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase()));

          // Combine the filtered movies and TV shows into a filtered recommendation list
          const filteredRecommend = [...filteredMovies, ...filteredSeries];

          // Filter trending content (case-insensitive search in title or name)
          const filteredTrending = trending.filter(
              (t) => t.name?.toLowerCase().includes(keyword.toLowerCase()) || t.title?.toLowerCase().includes(keyword.toLowerCase())
          );

          // Return the filtered recommendation and trending lists
          res.status(200).json({ filteredRecommend: filteredRecommend, filteredTrending: filteredTrending });
      }
  } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: error.message });
  }
};

// Export the controller function for use in other parts of the application
module.exports = homeController;
