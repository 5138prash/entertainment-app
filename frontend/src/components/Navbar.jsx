import React, { useState, useRef, useEffect } from "react";  // Importing necessary hooks and libraries
import { MdMovieCreation } from "react-icons/md";  // Importing icons from react-icons
import { SiWindows } from "react-icons/si";
import { PiFilmStripFill } from "react-icons/pi";
import { IoBookmark } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { PiTelevisionFill } from "react-icons/pi";
import { Link, useNavigate, useLocation } from "react-router-dom";  // Importing navigation hooks and components
import { useSelector, useDispatch } from "react-redux";  // Importing redux hooks
import { logout } from "../slices/authSlice";  // Importing the logout action from Redux slice
import { useLogoutMutation } from "../slices/usersApiSlice";  // Importing the logout API mutation

// Custom hook to determine the current page based on the pathname
const useCurrentPage = () => {
  const location = useLocation();  // Using useLocation to get the current URL

  const path = location.pathname;  // Extracting the pathname from the location object
  
  // Determine which page the user is on based on the path
  const currentPage = path === '/' ? 'home'
                    : path.startsWith('/bookmarks') ? 'bookmarks'
                    : path.startsWith('/movies') ? 'movies'
                    : path.startsWith('/tvseries') ? 'tvseries'
                    : 'unknown';  // Default case for unknown pages

  return currentPage;  // Returning the current page
};

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);  // Accessing user info from Redux store
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // State to control the dropdown menu

  const dispatch = useDispatch();  // Accessing the Redux dispatch function
  const navigate = useNavigate();  // Using navigate to programmatically change routes
  const dropdownRef = useRef(null);  // Reference for the dropdown menu

  // Toggles the dropdown visibility
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Logs out the user by calling the logout mutation and dispatching the logout action
  const [logoutApi] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();  // Calls the API to log out
      dispatch(logout());  // Dispatches the logout action to Redux store
      navigate("/login");  // Redirects the user to the login page
    } catch (err) {
      console.log(err);  // Logs any errors that occur during logout
    }
  };

  const currentPage = useCurrentPage();  // Gets the current page using the custom hook

  // Closes the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Checks if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);  // Closes the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);  // Adds the event listener
    return () => document.removeEventListener('mousedown', handleClickOutside);  // Cleans up the event listener on component unmount
  }, []);

  return (
    <nav className="sticky z-10 top-0 md:max-h-[90vh] shadow-lg flex rounded-lg md:flex-col bg-gun-metal items-center justify-between p-2 md:py-3 md:px-0 z-50">
      <div className="flex md:flex-col md:gap-[60px] items-center justify-between flex-grow md:flex-grow-0">
        <Link to="/" aria-label="Home">
          <MdMovieCreation size={36} className="text-custom-red" />
        </Link>

        <div className={`flex md:flex-col gap-4 items-center flex-grow md:flex-grow-0 justify-center md:justify-between`}>
          {/* Navigation Links with active page highlight */}
          <Link to="/" aria-label="Home">
            <SiWindows className={`${currentPage === 'home' ? 'text-white' : 'text-custom-light-blue'}`} size={18} />
          </Link>
          <Link to="/movies" aria-label="Movies">
            <PiFilmStripFill size={26} className={`rotate-90 ${currentPage === 'movies' ? 'text-white' : 'text-custom-light-blue'}`} />
          </Link>
          <Link to="/tvseries" aria-label="TV Series">
            <PiTelevisionFill className={`${currentPage === 'tvseries' ? 'text-white' : 'text-custom-light-blue'}`} size={24} />
          </Link>
          <Link to="/bookmarks" aria-label="Bookmarks">
            <IoBookmark className={`${currentPage === 'bookmarks' ? 'text-white' : 'text-custom-light-blue'}`} size={24} />
          </Link>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        {/* If the user is logged in, show the user avatar and dropdown */}
        {userInfo ? (
          <>
            <button
              onClick={handleDropdownToggle}
              className="flex items-center rounded-full px-3 text-[32px] font-medium text-gray-900 bg-red-500 rounded-full shadow-sm hover:bg-white"
            >
              {userInfo.name[0]}  {/* Display the first letter of the user's name */}
            </button>

            {isDropdownOpen && (
              // Dropdown menu with logout option
              <div className="absolute right-0 md:left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-1">
                  <p
                    onClick={logoutHandler}  // Logout button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          // If the user is not logged in, show the login link
          <Link to="/login" aria-label="Login">
            <FaCircleUser size={32} className="text-red-500" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
