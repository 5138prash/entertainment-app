import React from 'react';  // Importing the React library to create the component

// Custom Spinner will be displayed during the page loading
const Loader = () => {
  return (
    // The parent div centers the spinner vertically and horizontally in the full height of the screen
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* The first spinner circle */}
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        {/* The second circle (small) placed at the center of the first spinner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;  // Exporting the Loader component to be used in other parts of the app
