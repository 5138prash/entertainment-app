import React from "react";
import Card from "../components/Card";
import { useGetHomeQuery } from "../slices/homeApiSlice";
import Trending from "../components/Trending";
import Loader from "../components/Loader";
import { useParams, useLocation } from "react-router-dom";

const Home = () => {
  // Extracting the 'keyword' from URL parameters (for search functionality)
  const { keyword = "" } = useParams();

  // Fetching data for home page based on the search keyword
  const { data, isLoading, error } = useGetHomeQuery({
    keyword,
  });

  // Checking if the current URL is for search results
  const location = useLocation();
  const isSearchInUrl = location.pathname.includes("/search");

  return (
    <>
      {isLoading ? (
        // Displaying a loader while data is being fetched
        <Loader />
      ) : error ? (
        // Displaying error message if there's an issue with fetching data
        <div className="my-5 text-red-600 text-lg">
          {error?.data?.message || "An Error Occured"}
        </div>
      ) : (
        <>
          {/* Displaying Trending section */}
          <div className="text-[24px] font-semibold my-3">Trending</div>
          <div>
            {/* Showing search results message if search is active */}
            {isSearchInUrl && (
              <div className="pb-5 text-[18px]">{`Found ${data.filteredTrending?.length} results for '${keyword}' in Trending`}</div>
            )}

            {/* If no trending data available, show message */}
            {!isSearchInUrl && data.trending?.length === 0 ? (
              <div className="text-red-600 text-[18px] font-semibold">
                No Data in Trending
              </div>
            ) : (
              // Displaying trending items in Trending component
              <Trending items={data.trending || data.filteredTrending} />
            )}
          </div>

          {/* Displaying Recommended For You section */}
          <div className="text-[24px] font-semibold my-5">Recommended For You</div>
          {isSearchInUrl && (
            <div className="pb-5 text-[18px]">{`Found ${data.filteredRecommend?.length} results for '${keyword}' in Recommendations`}</div>
          )}

          {/* If no recommended data available, show message */}
          {!isSearchInUrl && data.recommend?.length === 0 ? (
            <div className="text-red-600 text-[18px] font-semibold">
              No Data in Recommends
            </div>
          ) : (
            // Displaying recommended items in Card component
            <Card items={data.recommend || data.filteredRecommend} />
          )}
        </>
      )}
    </>
  );
};

export default Home;
