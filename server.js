// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const axios = require("axios");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const ObjectId = require("mongoose").Types.ObjectId;

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error(err));

// // Quiz Schema
// const quizSchema = new mongoose.Schema({
//   question: String,
//   options: [String],
//   correctAnswer: String,
//   category: String,
// });

// const Quiz = mongoose.model("Quiz", quizSchema);

// const scoreSchema = new mongoose.Schema({

//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   username: { type: String, required: true},
//   // quizId: { type: String, required: true },
//   score: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Score = mongoose.model("Score", scoreSchema);


// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true },
//   totalScore: { type: Number, default: 0 }, // Aggregate total score for leaderboard
//   scores: [
//     {
//       // quizId: String,  // Tracks which quiz the score belongs to
//       score: Number,   // Individual score for that quiz
//       date: { type: Date, default: Date.now }, // Date the quiz was taken
//     },
//   ],
// });

// const User = mongoose.model("User", UserSchema);

// const JWT_SECRET = process.env.JWT_SECRET

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   jwt.verify(token.split(" ")[1], JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // 1. Register Route
// app.post("/api/register", async (req, res) => {
//   const { username, password, email } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(400).json({ error: "User already exists" });
//   }
// });

// // 2. Login Route
// app.post("/api/login", async (req, res) => {
//   const { username, password} = req.body;

//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).json({ error: "User not found" });

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token });
// });

// // 3. Save Progress Route
// app.post("/api/quiz/progress", authenticate, async (req, res) => {
//   const { quizId, score } = req.body;

//   try {
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: { scores: { quizId, score, date: new Date() } },
//     });
//     res.status(200).json({ message: "Progress saved successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save progress" });
//   }
// });

// app.post("/api/score", authenticate, async (req, res,) => {
//   try {
//     // await Score.collection.dropIndexes();
//     console.log(req.user.id)
//     // const user = await User.findById(req.body.userId)
//     const {score } = req.body;
//     const newScore = new Score({
//       userId: req.user.id,
//       username: req.user.username,
//       score,
//     });
//     console.log(newScore)
    
//     await newScore.save();
    
//     //   const userId = new
//     const userId = new ObjectId(req.user.id)
    
//     const totalScoreResult = await Score.aggregate([
//       { $match: { userId,} },
//       { $group: { _id: null, totalScore: { $sum: "$score" } } },
//     ]);

//     const totalScore = totalScoreResult.length > 0 ? totalScoreResult[0].totalScore : 0;

//     // Update the user's total score
//     await User.findByIdAndUpdate(userId, { totalScore });
//     res.json({ message: "Score saved successfully!" });
//   } catch (error) {
//     console.error("Error updating total score:", error);
//     throw error;
//   }
// });

// // 4. Leaderboard Route
// // app.get("/api/leaderboard", async (req, res) => {
// //   try {
// //     const leaderboard = await User.aggregate([
// //       { $unwind: "$scores" },
// //       {
// //         $group: {
// //           _id: "$username",
// //           totalScore: { $sum: "$scores.score" },
// //         },
// //       },
// //       { $sort: { totalScore: -1 } },
// //       { $limit: 10 }, // Top 10 users
// //     ]);
// //     res.json(leaderboard);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch leaderboard" });
// //   }
// // });

// app.get("/api/leaderboard", async (req, res) => {
//   try {
//     // Fetch top 10 users sorted by their total scores
//     const leaderboard = await User.find()
//       .sort({ totalScore: -1 }) // Sort in descending order of totalScore
//       .limit(10) // Limit to top 10 users
//       // .select("username totalScore");

//     res.json(leaderboard);
//   } catch (error) {
//     console.error("Failed to fetch leaderboard:", error);
//     res.status(500).json({ error: "Failed to fetch leaderboard" });
//   }
// });


// const API_KEY = process.env.GEMINI_API_KEY; // Ensure this is set in .env file

// app.post("/api/generate-quiz", async (req, res) => {
//     const {topic} = req.body
//   try {
//     const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${API_KEY}`,
//     //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
//       {
//         contents: [
//             {
//             role: "user",
//             parts: [{ text:  `Generate a quiz on ${topic} with 5 multiple-choice questions. 
//                 Return ONLY a JSON object in this format:
                
//                 {
//                   "questions": [
//                     {
//                       "question": "What is JavaScript?",
//                       "options": ["A programming language", "A database", "A browser", "An API"],
//                       "answer": "A programming language"
//                     }
//                   ]
//                 }` }]
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text
//     const match = aiResponse.match(/\{[\s\S]*\}/);
//     const jsonData = match ? JSON.parse(match[0]) : { error: "Invalid JSON format" };
//     // const jsonResponse = JSON.parse(aiResponse)
//     res.json(jsonData);
//   } catch (error) {
//     console.error("Error:", error.response ? error.response.data : error.message);
//     res.status(500).json({ error: "Failed to generate question" });
//   }
// });


// // API to Generate AI-based Quiz Question
// // app.post("/api/generate-quiz", async (req, res) => {
// //   try {
// //     const { topic } = req.body;

// //     const response = await axios.post(
// //       `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
// //       {
// //         contents: [
// //           { role: "user", parts: [{ text: `Create a multiple-choice question on ${topic}.` }] }
// //         ]
// //       },
// //       {
// //         headers: { "Content-Type": "application/json" }
// //       }
// //     );

// //     const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
// //     if (!generatedText) {
// //       return res.status(500).json({ error: "Failed to generate quiz question" });
// //     }

// //     res.json({ question: generatedText });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Error generating quiz question" });
// //   }
// // });

// // API to Get All Quiz Questions
// app.get("/api/quizzes", async (req, res) => {
//   const quizzes = await Quiz.find();
//   res.json(quizzes);
// });

// // API to Analyze Interview Answer
// app.post("/api/interview", async (req, res) => {
//   try {
//     const { userAnswer } = req.body;

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           { role: "user", parts: [{ text: `Analyze this answer and provide feedback: ${userAnswer}` }] }
//         ]
//       },
//       {
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//     const feedback = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
//     if (!feedback) {
//       return res.status(500).json({ error: "Failed to generate feedback" });
//     }

//     res.json({ feedback });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error analyzing answer" });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'dist')))

// Routes
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/interview", interviewRoutes);

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
