import { MOVIES_URL } from "../constants"; // Import the MOVIES_URL constant for the base URL of movie-related API requests
import { apiSlice } from "./apiSlice"; // Import the base apiSlice for injecting endpoints

// Define the moviesApiSlice by injecting endpoints into the base apiSlice
export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch a list of movies based on a search keyword
    getMovies: builder.query({
      query: ({ keyword }) => ({
        url: MOVIES_URL, // URL for fetching the movie list
        params: {
          keyword, // Pass the keyword parameter for filtering movies by search term
        },
        keepUnusedDataFor: 5, // Cache the data for 5 seconds after it becomes unused
      }),
    }),
    // Endpoint to fetch a specific movie's details by its ID
    getMovieById: builder.query({
      query: (id) => `${MOVIES_URL}/${id}`, // Directly return the URL with movie ID
      keepUnusedDataFor: 5, // Cache the data for 5 seconds after it becomes unused
    }),
  }),
});

// Export hooks for the injected queries so that components can use them
export const { useGetMoviesQuery, useGetMovieByIdQuery } = moviesApiSlice;
