const ObjectId = require("mongoose").Types.ObjectId;

const Score = require("../models/Score");
const User = require("../models/User");

exports.saveScore = async (req, res) => {
  // const { score } = req.body;
  // const user = await User.findById(req.body.userId)
  try {
  //   const newScore = new Score({ userId: req.user.id, username: req.user.username, score });
  //   await newScore.save();

  //   const totalScoreResult = await Score.aggregate([
  //     { $match: { userId: req.user.id } },
  //     { $group: { _id: null, totalScore: { $sum: "$score" } } },
  //   ]);

  //   const totalScore = totalScoreResult.length > 0 ? totalScoreResult[0].totalScore : 0;
  //   await User.findByIdAndUpdate(req.user.id, { totalScore });

  //   res.json({ message: "Score saved successfully!" });



  const user = await User.findById(req.body.userId)
    const {score } = req.body;
    const newScore = new Score({
      userId: req.user.id,
      username: req.user.username,
      score,
    });
    console.log(newScore)
    
    await newScore.save();
    
    //   const userId = new
    const userId = new ObjectId(req.user.id)
    
    const totalScoreResult = await Score.aggregate([
      { $match: { userId,} },
      { $group: { _id: null, totalScore: { $sum: "$score" } } },
    ]);

    const totalScore = totalScoreResult.length > 0 ? totalScoreResult[0].totalScore : 0;

    // Update the user's total score
    await User.findByIdAndUpdate(userId, { totalScore });
    res.json({ message: "Score saved successfully!" });
  
  
  } catch (error) {
    console.error("Failed to save score:", error);
    res.status(500).json({ error: "Failed to save score" });
  }
};
