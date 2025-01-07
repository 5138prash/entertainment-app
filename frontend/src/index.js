import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing ReactDOM to render the app
import "./index.css"; // Importing global styles
import App from "./App"; // Importing the main App component
import reportWebVitals from "./reportWebVitals"; // Importing web vitals for performance measurement
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"; // Importing routing components from React Router DOM
import Home from "./pages/Home"; // Importing the Home page component
import Bookmarks from "./pages/Bookmarks"; // Importing the Bookmarks page component
import MovieDetail from "./pages/MovieDetail"; // Importing the Movie Detail page component
import Login from "./pages/Login"; // Importing the Login page component
import Signup from "./pages/Signup"; // Importing the Signup page component
import TvSeriesDetail from "./pages/TvSeriesDetail"; // Importing the TV Series Detail page component
import { Provider } from "react-redux"; // Importing Redux Provider to integrate store with app
import store from "./store/store"; // Importing the Redux store
import Movies from "./pages/Movies"; // Importing the Movies page component
import TvSeries from "./pages/TvSeries"; // Importing the TV Series page component

// Setting up the routes for the application
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Main routes */}
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/search/:keyword" element={<Movies />} />
      <Route path="/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/search/:keyword/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/movies/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/movies/search/:keyword/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/tvseries" element={<TvSeries />} />
      <Route path="/tvseries/search/:keyword" element={<TvSeries />} />
      <Route path="/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route path="/search/:keyword/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route path="tvseries/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route path="tvseries/search/:keyword/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/bookmarks/search/:keyword" element={<Bookmarks />} />
      <Route path="/bookmarks/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/bookmarks/search/:keyword/moviedetail/:id" element={<MovieDetail />} />
      <Route path="/bookmarks/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route path="/bookmarks/search/:keyword/tvseriesdetail/:id" element={<TvSeriesDetail />} />
    </Route>
  )
);

// Rendering the application inside the root element
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrapping the RouterProvider with Redux Provider to give access to the store */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// Measure and report web vitals (performance metrics)
reportWebVitals();
