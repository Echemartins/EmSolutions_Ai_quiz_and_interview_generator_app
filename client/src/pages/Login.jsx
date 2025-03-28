import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://emsolutions-ai-quiz-and-interview.onrender.com/api/login", { username, password });
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      toast.success("signed in succesfully")
      // Display success toast
      // Toastify({
      //   text: "Login successful! Redirecting to home...",
      //   duration: 7000,
      //   gravity: "top", // Toast position: top or bottom
      //   position: "right", // Toast alignment: left, center, or right
      //   backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Gradient background
      //   close: true, // Show close button
      // }).showToast();

      // Navigate to home page after a delay
      setTimeout(() => {
        navigate("/home");
      }, 3000); 
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "error signing in")
      // Display error message
      alert("Login failed: " + (error.response?.data?.error || "An error occurred"));
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-purple-100 to-green-900">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Login</h1>
        {/* Username Input */}
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-green-400 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring focus:ring-green-300"
        />
        {/* Password Input */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-green-400 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring focus:ring-green-300"
        />
        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white py-2 px-4 w-full rounded-lg hover:bg-green-600 transition-colors"
        >
          Login
        </button>
        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 underline hover:text-purple-700">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
