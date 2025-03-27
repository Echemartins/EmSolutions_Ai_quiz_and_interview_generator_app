const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  scores: [
    {
      score: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
