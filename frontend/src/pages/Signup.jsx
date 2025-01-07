import React, { useState, useEffect } from "react";
import { MdMovieCreation } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const Signup = () => {
  // State hooks to manage form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Register mutation to handle user registration
  const [register, { isLoading }] = useRegisterMutation();

  // Accessing user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Accessing the search parameters from the URL for redirecting
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; // Default to home if no redirect is specified

  // If user is already logged in, navigate to the redirect path
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        // Call the register API and handle successful response
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res })); // Save user info in Redux store
        toast.success("Account Created Successfully");
        navigate(redirect); // Redirect to the previous page
      } catch (err) {
        // Handle error if registration fails
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex justify-around items-center flex-col h-[100%]">
      {/* Icon representing movie creation */}
      <div className="flex justify-center">
        <MdMovieCreation className="text-[50px] text-custom-red" />
      </div>

      {/* Signup form */}
      <form
        onSubmit={submitHandler}
        className="bg-gun-metal py-4 px-[25px] w-[300px] sm:w-[350px] rounded-lg"
      >
        <h1 className="text-[24px] font-semibold pb-4">Sign Up</h1>

        <div className="py-4">
          {/* Input for full name */}
          <input
            type="text"
            value={name}
            placeholder="Your full name"
            className="my-1 p-2 bg-gun-metal border-custom-light-blue w-full border-b-2 outline-none caret-custom-red"
            onChange={(e) => setName(e.target.value)}
          />
          {/* Input for username/email */}
          <input
            type="text"
            value={email}
            placeholder="Username"
            className="my-1 p-2 bg-gun-metal border-custom-light-blue w-full border-b-2 outline-none caret-custom-red"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Input for password */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="my-1 border-b-2 w-full bg-gun-metal border-custom-light-blue p-2 outline-none caret-custom-red"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Input for confirming the password */}
          <input
            type="password"
            value={confirmPassword}
            placeholder="Repeat Password"
            className="my-1 border-b-2 w-full bg-gun-metal border-custom-light-blue p-2 outline-none caret-custom-red"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit button with conditional text based on loading state */}
        <button
          type="submit"
          className={`w-full ${isLoading ? "bg-custom-light-blue" : "bg-custom-red"} rounded py-2 my-3 hover:bg-white hover:text-black`}
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create an account"}
        </button>

        {/* Link to the login page if the user already has an account */}
        <div className="text-center text-[13px]">
          Already have an account?{" "}
          <Link to={"/login"} aria-label="login">
            <span className="text-custom-red hover:underline px-2">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
