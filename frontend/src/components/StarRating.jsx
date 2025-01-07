import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// This component returns the number of stars according to the rating
const StarRating = ({ rating }) => {
  // Convert rating to an integer (rating out of 5)  
  const fullStars = Math.floor(rating); // Get the number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there is a half star

  return (
    <div className="flex items-center space-x-1">
      {/* Loop through an array of 5 elements to render 5 stars */}
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          // Render full stars
          return (
            <FaStar key={index} className="text-yellow-500" />
          );
        } else if (index === fullStars && hasHalfStar) {
          // Render half star if applicable
          return (
            <FaStarHalfAlt key={index} className="text-yellow-500" />
          );
        } else {
          // Render empty stars
          return (
            <FaRegStar key={index} className="text-yellow-500" />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
