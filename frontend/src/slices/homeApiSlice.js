import { apiSlice } from "./apiSlice"; // Import the apiSlice for injecting endpoints and creating API hooks
import { HOME_URL } from "../constants"; // Import the HOME_URL constant to use in API requests

// Define the homeApiSlice by injecting endpoints into the base apiSlice
export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch home data, possibly filtered by a keyword
    getHome: builder.query({
      query: ({ keyword }) => ({
        url: HOME_URL, // The URL for fetching the home data
        params: { keyword }, // Parameters to be included in the request for keyword search
        keepUnusedDataFor: 5, // Data will be kept for 5 seconds after it becomes unused in the cache
      }),
    }),
  }),
});

// Export the auto-generated hook for the getHome query endpoint to be used in components
export const { useGetHomeQuery } = homeApiSlice;
