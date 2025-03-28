import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaUserGraduate,
  FaQuestionCircle,
  FaCog,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by verifying token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear token and redirect to login page
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    alert("You have been logged out.");
  };

  return (
    <div
      className={`fixed h-screen bg-gradient-to-b from-purple-100 to-green-100 text-gray-800 shadow-lg transition-all duration-300 
      w-20 md:w-64`}
    >
      <div className="flex flex-col items-center py-6">
        {/* App Logo */}
        <h1
          className={`text-2xl font-bold mb-6 tracking-wide text-purple-700 hidden md:block`}
        >
          EMsolutions
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-col w-full px-4">
          <SidebarLink
            to="/home"
            icon={<FaHome />}
            label="Home"
          />
          {isLoggedIn && (
            <>
              <SidebarLink
                to="/quiz"
                icon={<FaQuestionCircle />}
                label="Quiz"
              />
              <SidebarLink
                to="/interview"
                icon={<FaUserGraduate />}
                label="Interview"
              />
              <SidebarLink
                to="/leaderboard"
                icon={<FaChartBar />}
                label="Leaderboard"
              />
              <SidebarLink
                to="/settings"
                icon={<FaCog />}
                label="Settings"
              />
              <SidebarLink
                to="#"
                icon={<FaSignOutAlt />}
                label="Logout"
                onClick={handleLogout}
              />
            </>
          )}
          {!isLoggedIn && (
            <>
              <SidebarLink
                to="/"
                icon={<FaSignInAlt />}
                label="Login"
              />
              <SidebarLink
                to="/register"
                icon={<FaSignInAlt />}
                label="Register"
              />
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

// SidebarLink Component with Tooltip for Smaller Screens
const SidebarLink = ({ to, icon, label, onClick }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 py-3 px-4 mb-2 rounded-lg hover:bg-purple-200 transition duration-300 relative"
      onClick={onClick}
    >
      {/* Icon */}
      <div className="text-green-600 text-xl">{icon}</div>
      {/* Label - Hidden on small screens */}
      <span className="hidden md:inline text-lg font-medium text-gray-800">
        {label}
      </span>
    </Link>
  );
};

export default Sidebar;
