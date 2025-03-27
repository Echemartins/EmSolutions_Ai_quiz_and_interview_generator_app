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
  FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by verifying token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Clear token and redirect to login page
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    alert("You have been logged out.");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-purple-100 to-green-100 text-gray-800 shadow-lg transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        className={`absolute top-4 right-[-15px] w-8 h-8 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-300 flex items-center justify-center`}
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <div className="flex flex-col items-center py-6">
        {/* App Logo */}
        {!isCollapsed && (
          <h1 className="text-2xl font-bold mb-6 tracking-wide text-purple-700">EMsolutions</h1>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col w-full px-4">
          <SidebarLink
            to="/home"
            icon={<FaHome />}
            label="Home"
            isCollapsed={isCollapsed}
          />
          {isLoggedIn && (
            <>
              <SidebarLink
                to="/quiz"
                icon={<FaQuestionCircle />}
                label="Quiz"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                to="/interview"
                icon={<FaUserGraduate />}
                label="Interview"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                to="/leaderboard"
                icon={<FaChartBar />}
                label="Leaderboard"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                to="/settings"
                icon={<FaCog />}
                label="Settings"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                to="#"
                icon={<FaSignOutAlt />}
                label="Logout"
                isCollapsed={isCollapsed}
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
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                to="/register"
                icon={<FaSignInAlt />}
                label="Register"
                isCollapsed={isCollapsed}
              />
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

// SidebarLink Component with Tooltip
const SidebarLink = ({ to, icon, label, isCollapsed, onClick }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 py-3 px-4 mb-2 rounded-lg hover:bg-purple-200 transition duration-300 relative"
      onClick={onClick}
    >
      {/* Icon */}
      <div className="text-green-600 text-xl">{icon}</div>
      {/* Label */}
      {!isCollapsed && <span className="text-lg font-medium text-gray-800">{label}</span>}
      {/* Tooltip */}
      {isCollapsed && (
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;
