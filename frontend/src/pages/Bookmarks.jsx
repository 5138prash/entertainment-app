import React from "react";
import Card from "../components/Card";
import { useGetBookmarksQuery } from "../slices/bookmarkApiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useParams, useLocation } from "react-router-dom";

const Bookmarks = () => {
  // Extracting the 'keyword' from URL parameters for search functionality
  const { keyword } = useParams();

  // Getting user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  // Fetching bookmarked items (movies and TV series) based on userId and keyword
  const { data, isLoading, error, refetch } = useGetBookmarksQuery({ userId, keyword }, {
    refetchOnMountOrArgChange: true, // Automatically refetch data when dependencies change
  });

  // Checking if the current URL is for search results
  const location = useLocation();
  const isSearchInUrl = location.pathname.includes("/search");

  // Filtering the data to separate movies and TV series
  const movies = data?.filter((item) => item.title); // Filtering movies from data
  const series = data?.filter((item) => item.name); // Filtering TV series from data

  return (
    <>
      {isLoading ? (
        // Showing a loader while data is being fetched
        <Loader />
      ) : error ? (
        // Displaying error message if there's an issue with fetching data
        <div className="my-5 text-red-600 text-lg">{error?.data?.message || "An Error Occured"}</div>
      ) : (
        <div>
          {/* Displaying Bookmarked Movies */}
          <div className="my-5">
            <div className="mb-5 text-[24px]">Bookmarked Movies</div>
            {/* Showing search results message if search is active */}
            {isSearchInUrl && <div className="pb-5 text-[24px]">{`Found ${movies.length} results for '${keyword}' in bookmarked movies`}</div> }
            {/* If no movies are bookmarked, show message */}
            {!isSearchInUrl && movies.length === 0 ? (
              <div className="text-red-600 font-semibold">You have not Bookmarked any movie</div>
            ) : (
              // Displaying movies in a Card component
              <Card items={movies} refetchBookmarks={refetch} />
            )}
            
            {/* Displaying Bookmarked TV Series */}
            <div className="my-5 text-[24px]">Bookmarked Tv Series</div>
            {/* Showing search results message if search is active */}
            {isSearchInUrl && <div className="pb-5 text-[24px]">{`Found ${series.length} results for '${keyword}' in bookmarked Tv series`}</div> }
            {/* If no series are bookmarked, show message */}
            {!isSearchInUrl && series.length === 0 ? (
              <div className="text-red-600 font-semibold">You have not Bookmarked any Tv Shows</div>
            ) : (
              // Displaying series in a Card component
              <Card items={series} refetchBookmarks={refetch} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
