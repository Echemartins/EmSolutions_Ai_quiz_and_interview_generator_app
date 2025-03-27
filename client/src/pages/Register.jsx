import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://emsolutions.onrender.com/0/api/register", { username, email, password });
      alert("Registration successful. Please log in.");
      navigate("/home");
    } catch (error) {
      alert("Error during registration: " + (error.response?.data?.error || "An error occurred"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-purple-100 to-green-200">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Register</h1>
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
        {/* Email Input */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white py-2 px-4 w-full rounded-lg hover:bg-green-600 transition-colors"
        >
          Register
        </button>
        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 underline hover:text-purple-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
