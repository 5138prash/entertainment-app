import React, { useEffect } from "react";
import Card from "../components/Card";
import { useGetMoviesQuery } from "../slices/moviesApiSlice";
import Loader from "../components/Loader";
import { useParams, useLocation } from "react-router-dom";

const Movies = () => {
  // Retrieving the search keyword from the URL parameters
  const { keyword } = useParams();
  
  // Fetching movies data based on the search keyword
  const { data: items, isLoading, error } = useGetMoviesQuery({
    keyword
  });

  // Getting the current URL location to check if it's a search page
  const location = useLocation();
  const isSearchInUrl = location.pathname.includes("/search");

  // Effect hook to react to changes in movie items (e.g., updating after fetch)
  useEffect(() => {
    // Placeholder for side effects (not currently in use)
  }, [items]);

  return (
    <>
      {/* Display loader while the data is loading */}
      {isLoading ? (
        <Loader/>
      ) : error ? (
        // Display error message if fetching fails
        <p className="text-[18px] text-custom-red">{error?.data?.message || error?.message}</p> 
      ) :  (
        <>
          {/* Displaying the page title */}
          <div className="text-[24px] font-semibold my-5">Movies</div>

          {/* Display the search result count if it's a search page */}
          {isSearchInUrl && <div className="pb-5 text-[18px] font-semibold">{`Found ${items.length} results for '${keyword}' in Movies`}</div>}

          {/* Rendering movie cards */}
          <Card items={items} />
        </>
      )}
    </>
  );
};

export default Movies;
