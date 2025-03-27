import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../assets/components/Sidebar";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("https://emsolutions-ai-quiz-and-interview.onrender.com//0/api/leaderboard");
        setLeaderboard(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
        setError("Failed to load leaderboard");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Leaderboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-700">Loading leaderboard...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center">
            <p className="text-lg font-semibold text-red-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Top Performers</h2>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                Refresh
              </button>
            </div>

            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border border-gray-300">Rank</th>
                  <th className="py-2 px-4 border border-gray-300">Username</th>
                  <th className="py-2 px-4 border border-gray-300">Score</th>
                  <th className="py-2 px-4 border border-gray-300">Quizzes Taken</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((user, index) => (
                    <tr
                      key={user.username}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-300">{user.username}</td>
                      <td className="py-2 px-4 border border-gray-300">{user.score}</td>
                      <td className="py-2 px-4 border border-gray-300">{user.quizzesTaken}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 text-center text-gray-500 border border-gray-300"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
