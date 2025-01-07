import React from "react";
import { useParams } from "react-router-dom"; // Import the useParams hook to get the dynamic ID from the URL
import { IMAGE_BASE_URL } from "../constants"; // Import base URL for images
import { BiLink } from "react-icons/bi"; // Import BiLink icon for external link button
import StarRating from "../components/StarRating"; // Import StarRating component for ratings
import Loader from "../components/Loader"; // Import Loader component to display loading state
import { useGetTvSeriesByIdQuery } from "../slices/tvseriesApiSlice"; // Import custom hook for fetching TV series by ID

const TvSeriesDetail = () => {
  const { id } = useParams(); // Get the ID of the TV series from the URL
  const { data, isLoading, error } = useGetTvSeriesByIdQuery(id); // Fetch the TV series data using the custom hook

  // Safeguard for accessing properties to prevent undefined errors
  const series = data?.series || {};
  const cast = data?.cast || [];

  return (
    <>
      {/* Show Loader if data is being fetched */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        // Show error message if there's an issue fetching the data
        <p className="text-[18px] text-custom-red">{error?.data?.message || error?.message || "An error occurred"}</p>
      ) : (
        <div className="sm:grid grid-cols-12 gap-8 my-5">
          {/* TV Series Poster */}
          <div className="col-span-4 overflow-hidden">
            {series.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}/${series.poster_path}`} // Display the TV series poster if available
                alt="poster"
                className="w-full object-cover rounded"
              />
            ) : (
              // Fallback if poster image is not available
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image Available</div>
            )}
          </div>

          <div className="col-span-8 flex flex-col gap-4">
            {/* TV Series Title */}
            <div className="text-[32px]">
              {series.name || series.original_name || 'No Name Available'}
            </div>

            {/* TV Series Ratings */}
            {series.vote_average ? (
              <div className="text-[18px] flex items-center gap-5">
                <span>{Number(series.vote_average / 2).toFixed(2)}</span> 
                <span>
                  <StarRating rating={Number(series.vote_average / 2).toFixed(2)} />
                </span>
              </div>
            ) : 'N/A'}

            {/* TV Series Information (Language, Air Dates, Status) */}
            <div className="grid grid-cols-12">
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Language</p>
                <p className="text-[18px] font-semibold">{series.spoken_languages?.[0]?.english_name || 'N/A'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">First Air</p>
                <p className="text-[18px] font-semibold">{series.first_air_date ? `${series.first_air_date}` : 'N/A'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Last Air</p>
                <p className="text-[18px] font-semibold">{series.last_air_date ? `${series.last_air_date}` : 'N/A'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Status</p>
                <p className="text-[18px] font-semibold">{series.status || 'N/A'}</p>
              </div>
            </div>

            {/* TV Series Genres */}
            <div>
              <p className="py-2 font-semibold text-[24px]">Genres</p>
              <div className="flex flex-wrap gap-4">
                {series.genres?.map((g) => (
                  <span key={g.id} className="bg-white text-black font-semibold px-2 rounded">{g.name}</span>
                )) || 'No Genres Available'}
              </div>
            </div>

            {/* TV Series Synopsis */}
            <div>
              <p className="font-semibold py-2 text-[24px]">Synopsis</p>
              <p className="py-1 text-[15px]">{series.overview || 'No Synopsis Available'}</p>
            </div>

            {/* TV Series Cast */}
            <div>
              <p className="py-2 font-semibold text-[24px]">Casts</p>
              <div className="flex gap-2 flex-wrap items-center">
                {cast.map((c) => (
                  <span key={c.id} className="border rounded-md px-2 font-semibold">{c.name}</span>
                )) || 'No Cast Available'}
              </div>
            </div>

            {/* TV Series Homepage Link */}
            <div className="py-2">
              {series.homepage ? (
                <a href={series.homepage} target="_blank" rel="noopener noreferrer">
                  <button className="w-[120px] flex items-center justify-around rounded-sm text-white bg-custom-light-blue px-4 py-[6px]">
                    <span className="text-[15px]">Website</span>
                    <span className="text-[18px]"><BiLink /></span>
                  </button>
                </a>
              ) : <span className="text-custom-red">Website unavailable</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TvSeriesDetail;
