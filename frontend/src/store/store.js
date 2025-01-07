import { configureStore } from '@reduxjs/toolkit'; // Import configureStore to set up the Redux store
import { apiSlice } from '../slices/apiSlice'; // Import the apiSlice to handle API calls and caching
import authSlice from '../slices/authSlice'; // Import authSlice to manage user authentication state

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Inject the apiSlice reducer to handle API requests and responses
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    // Inject the authSlice reducer to manage authentication state
    auth: authSlice.reducer,
  },
  // Set up middleware, including the apiSlice middleware for API handling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add apiSlice middleware to enhance store with API functionality

  // Enable Redux DevTools for debugging (can be disabled in production)
  devTools: true,
});

// Export the store for use in the app
export default store;
