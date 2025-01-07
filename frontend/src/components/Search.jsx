import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams(); // Retrieve keyword from the URL parameters

  // FIX: uncontrolled input - urlKeyword may be undefined, so fallback to an empty string if not found
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const location = useLocation(); // Get the current location (path) of the app
  const isBookmarksInUrl = location.pathname.includes("/bookmarks"); // Check if the current path includes '/bookmarks'
  const isMoviesInUrl = location.pathname.includes("/movies"); // Check if the current path includes '/movies'
  const isTvSeriesInUrl = location.pathname.includes("/tvseries"); // Check if the current path includes '/tvseries'

  // List of paths where search functionality should be disabled
  const pathsToDisableSearch = [
    "/moviedetail", // Search disabled on movie detail pages
    "/tvseriesdetail", // Search disabled on TV series detail pages
    "/login", // Search disabled on login page
    "/signup", // Search disabled on signup page
  ];
  
  // Check if the current path should disable the search feature
  const disableSearch = pathsToDisableSearch.some((path) =>
    location.pathname.includes(path)
  );

  // Handle the form submission for search
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (keyword) {
      // Check if the user entered a search keyword and navigate accordingly
      if (isMoviesInUrl) {
        navigate(`/movies/search/${keyword.trim()}`);
      } else if (isTvSeriesInUrl) {
        navigate(`/tvseries/search/${keyword.trim()}`);
      } else if (isBookmarksInUrl) {
        navigate(`/bookmarks/search/${keyword.trim()}`);
      } else {
        navigate(`/search/${keyword.trim()}`);
      }
      setKeyword(""); // Clear the search field after submitting
    } else {
      // If the keyword is empty, navigate to the homepage
      navigate("/");
    }
  };

  return (
    <>
      {/* Render search form if search is not disabled on the current page */}
      {!disableSearch && (
        <form onSubmit={submitHandler} className="relative">
          <input
            type="text"
            value={keyword} // Bind the value of the input to the 'keyword' state
            placeholder={`Search for ${
              isBookmarksInUrl
                ? "Bookmarked Movies or TV series"
                : isMoviesInUrl
                ? "Movies"
                : isTvSeriesInUrl
                ? "Tv Series"
                : "Movies or TV series"
            }`} // Dynamic placeholder based on the current path
            onChange={(e) => setKeyword(e.target.value)} // Update the 'keyword' state on input change
            className="ml-[40px] w-[calc(100%-35px)] bg-custom-dark-blue text-xl py-2 border-0 focus:border-b-2 border-custom-light-blue outline-none caret-custom-red"
          />

          <button
            type="submit" // Trigger form submission
            className="absolute top-[12px] flex items-center text-xl"
            aria-label="search" // Add accessible label for screen readers
          >
            <FaSearch /> {/* Search icon */}
          </button>
        </form>
      )}
    </>
  );
};

export default SearchBox;
