const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ totalScore: -1 }) // Sort users by totalScore in descending order
      .limit(10) // Limit to the top 10 users
      .select("username totalScore"); // Only return username and totalScore

    res.json(leaderboard);
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
