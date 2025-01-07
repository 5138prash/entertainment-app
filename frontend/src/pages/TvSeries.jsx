import React from 'react';
import { useGetTvseriesQuery } from '../slices/tvseriesApiSlice'; // Import custom hook for fetching TV series data
import Card from '../components/Card'; // Import Card component for displaying TV series
import Loader from '../components/Loader'; // Import Loader component to show loading state
import { useParams, useLocation } from 'react-router-dom'; // Import necessary hooks for routing

const TvSeries = () => {
  // Destructure the 'keyword' from URL params to handle search queries
  const { keyword } = useParams();

  // Use the custom hook to fetch TV series data based on the keyword
  const { data: items, isLoading, error } = useGetTvseriesQuery({ keyword });

  // Use location hook to determine the current pathname for conditional rendering
  const location = useLocation();
  // Check if the URL path contains '/search' for search-specific UI
  const isSearchInUrl = location.pathname.includes("/search");

  return (
    <>
      {/* Display Loader while the data is being fetched */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        // Show error message if the API call fails
        <div className="my-5 text-red-600 text-lg">{error?.data?.message || "An Error Occured"}</div>
      ) : (
        <>
          {/* Display the title of the page */}
          <div className="text-[24px] font-semibold my-5">Tv Shows</div>

          {/* Conditionally display the number of results for search queries */}
          {isSearchInUrl && <div className="pb-5 text-[18px] font-semibold">{`Found ${items.length} results for '${keyword}' in Tv Series`}</div>}

          {/* Display the TV series in Card components */}
          <Card items={items} />
        </>
      )}
    </>
  );
};

export default TvSeries;
