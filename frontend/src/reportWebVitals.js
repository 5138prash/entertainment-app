// Function to report web vitals (performance metrics)
const reportWebVitals = onPerfEntry => {
  // Check if the provided onPerfEntry is a function before proceeding
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' package to get various performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Get and report the performance metrics:
      // CLS (Cumulative Layout Shift) measures visual stability
      getCLS(onPerfEntry);
      
      // FID (First Input Delay) measures the interactivity delay
      getFID(onPerfEntry);
      
      // FCP (First Contentful Paint) measures when the first content is painted
      getFCP(onPerfEntry);
      
      // LCP (Largest Contentful Paint) measures the time to load the largest visible element
      getLCP(onPerfEntry);
      
      // TTFB (Time to First Byte) measures the time to the first byte of response from the server
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
