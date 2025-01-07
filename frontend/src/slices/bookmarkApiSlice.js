import { apiSlice } from "./apiSlice"; // Import the apiSlice for injecting endpoints and creating API hooks
import { BOOKMARKS_URL } from "../constants"; // Import the bookmarks URL constant to use in API requests

// Define the bookmarksApiSlice by injecting endpoints into the base apiSlice
export const bookmarksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to add a bookmark
    addBookmark: builder.mutation({
      query: (data) => ({
        url: BOOKMARKS_URL, // The URL for adding the bookmark
        method: "POST", // HTTP method for the request
        body: data, // The body of the request contains the bookmark data to be added
      }),
    }),

    // Endpoint to get a user's bookmarks, potentially filtered by a keyword
    getBookmarks: builder.query({
      query: ({ userId, keyword }) => ({
        url: `${BOOKMARKS_URL}/${userId}`, // The URL with the userId to get the bookmarks of the user
        params: { userId, keyword }, // Parameters to be included in the request for userId and keyword search
        keepUnusedDataFor: 5, // Data will be kept for 5 seconds after it becomes unused in the cache
      }),
    }),

    // Endpoint to delete a bookmark
    deleteBookmark: builder.mutation({
      query: (data) => ({
        url: `${BOOKMARKS_URL}/delete`, // The URL for deleting the bookmark
        method: "DELETE", // HTTP method for the request
        body: data, // The body of the request contains the data needed to delete the bookmark
      }),
    }),
  }),
});

// Export the auto-generated hooks for the endpoints to be used in components
export const {
  useAddBookmarkMutation, // Hook to add a bookmark
  useGetBookmarksQuery, // Hook to fetch the list of bookmarks
  useDeleteBookmarkMutation, // Hook to delete a bookmark
} = bookmarksApiSlice;
