import { apiSlice } from "./apiSlice"; // Import the base apiSlice for injecting endpoints
import { TVSERIES_URL } from "../constants"; // Import the TVSERIES_URL constant for the base URL of TV series-related API requests

// Define the tvseriesApiSlice by injecting endpoints into the base apiSlice
export const tvseriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch a list of TV series based on a search keyword
    getTvseries: builder.query({
      query: ({ keyword }) => ({
        url: TVSERIES_URL, // URL for fetching the list of TV series
        params: {
          keyword, // Pass the keyword parameter for filtering TV series by search term
        },
        keepUnusedDataFor: 5, // Cache the data for 5 seconds after it becomes unused
      }),
    }),
    // Endpoint to fetch a specific TV series' details by its ID
    getTvSeriesById: builder.query({
      query: (id) => `${TVSERIES_URL}/${id}`, // Directly return the URL with TV series ID
      keepUnusedDataFor: 5, // Cache the data for 5 seconds after it becomes unused
    }),
  }),
});

// Export hooks for the injected queries so that components can use them
export const { useGetTvseriesQuery, useGetTvSeriesByIdQuery } = tvseriesApiSlice;
