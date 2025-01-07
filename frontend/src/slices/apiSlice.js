import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Import necessary methods from Redux Toolkit for API handling
import { BASE_URL } from '../constants'; // Import the base URL from constants

// Base query function that uses fetchBaseQuery with the provided BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice using Redux Toolkit's createApi method
export const apiSlice = createApi({
    baseQuery, // Attach the baseQuery to the slice
    tagTypes: ['Movie', 'Series', 'User'], // Define tag types for caching and invalidation (for movies, series, and users)
    
    // The endpoints section defines the API calls. 
    // Right now, it's empty, but you can define API endpoints here using builder.query or builder.mutation.
    endpoints: (builder) => ({
        // Define your endpoints here, for example:
        // getMovies: builder.query({...}),
        // createUser: builder.mutation({...}),
    }),
});
