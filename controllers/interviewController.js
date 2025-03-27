const axios = require("axios");

exports.analyzeAnswer = async (req, res) => {
  try {
    const { userAnswer } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [
          { role: "user", parts: [{ text: `Analyze this answer and provide feedback: ${userAnswer}` }] }
        ]
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const feedback = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!feedback) {
      return res.status(500).json({ error: "Failed to generate feedback" });
    }

    res.json({ feedback });
  } catch (error) {
    console.error("Error analyzing answer:", error);
    res.status(500).json({ error: "Error analyzing answer" });
  }
};
