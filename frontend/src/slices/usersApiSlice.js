import { apiSlice } from './apiSlice' // Import the base apiSlice for injecting endpoints
import { USERS_URL } from '../constants'; // Import the USERS_URL constant for the base URL of user-related API requests

// Define the usersApiSlice by injecting endpoints into the base apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to handle user login via a POST request with the user's credentials
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // URL for the login endpoint
        method: "POST", // HTTP method for login request
        body: data, // The user's login credentials passed in the request body
      }),
    }),

    // Endpoint to handle user logout via a POST request
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // URL for the logout endpoint
        method: "POST", // HTTP method for logout request
      }),
    }),

    // Endpoint to handle user registration via a POST request with the registration data
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL, // URL for the user registration endpoint
        method: "POST", // HTTP method for registration request
        body: data, // The registration data (e.g., username, email, password) passed in the request body
      }),
    }),
  }),
});

// Export hooks for the injected mutations so that components can use them
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
