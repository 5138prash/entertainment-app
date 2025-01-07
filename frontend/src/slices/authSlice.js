import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from Redux Toolkit to simplify slice creation

// Define the initial state of the authentication slice
const initialState =  {
    // Check if userInfo exists in localStorage, otherwise set it as null
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

// Create an authSlice to manage authentication state
const authSlice = createSlice({
    name: 'auth', // Name of the slice, used for debugging and logging in Redux DevTools
    initialState, // Initialize with the defined initialState
    reducers: {
        // Action to set user credentials when logging in or registering
        setCredentials: (state, action) => {
            state.userInfo = action.payload; // Update the state with the new userInfo
            // Store the updated userInfo in localStorage for persistence across sessions
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); 
        },
        
        // Action to log out the user
        logout: (state) => {
            state.userInfo = null; // Clear userInfo from state
            // Remove userInfo from localStorage to log the user out
            localStorage.removeItem('userInfo');
        } 
    }
})

// Export the actions (setCredentials and logout) to be used in components
export const { setCredentials, logout } = authSlice.actions;

// Export the authSlice as the default export to be used in the store
export default authSlice;
