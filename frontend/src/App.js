import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import Navbar from "./components/Navbar"; // Import Navbar component
import SearchBox from "./components/Search"; // Import SearchBox component for search functionality
import { ToastContainer } from "react-toastify"; // Import ToastContainer for displaying notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import Header from "./components/Header"; // Import Header component

function App() {
  return (
    // Main wrapper with grid layout and styling
    <div className="md:grid grid-cols-12 gap-2 p-4 bg-custom-dark-blue text-white min-h-[100vh]">
      
      {/* Navbar with a fixed width on the left side */}
      <Navbar className="col-span-1" />

      <main className="p-2 md:pt-0 bg-custom-dark-blue col-span-11">
        {/* Header section */}
        <Header />
        
        {/* SearchBox component */}
        <SearchBox />
        
        {/* Outlet renders the matched nested route component */}
        <Outlet />
      </main>
      
      {/* Toast container for showing toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
