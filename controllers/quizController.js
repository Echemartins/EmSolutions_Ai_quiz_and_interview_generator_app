const Quiz = require("../models/Quiz");
const axios = require("axios");

exports.generateQuiz = async (req, res) => {
//   const { topic } = req.body;
//   const API_KEY = process.env.GEMINI_API_KEY;

//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${API_KEY}`,
//       {
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: `Generate a quiz on ${topic} with 5 multiple-choice questions.` }],
//           },
//         ],
//       },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;
//     const match = aiResponse.match(/\{[\s\S]*\}/);
//     const jsonData = match ? JSON.parse(match[0]) : { error: "Invalid JSON format" };
//     res.json(jsonData);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate quiz" });
//   }
 const {topic} = req.body
 const API_KEY = process.env.GEMINI_API_KEY;
  try {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${API_KEY}`,
    //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [
            {
            role: "user",
            parts: [{ text:  `Generate a quiz on ${topic} with 5 multiple-choice questions. 
                Return ONLY a JSON object in this format:
                
                {
                  "questions": [
                    {
                      "question": "What is JavaScript?",
                      "options": ["A programming language", "A database", "A browser", "An API"],
                      "answer": "A programming language"
                    }
                  ]
                }` }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text
    const match = aiResponse.match(/\{[\s\S]*\}/);
    const jsonData = match ? JSON.parse(match[0]) : { error: "Invalid JSON format" };
    // const jsonResponse = JSON.parse(aiResponse)
    res.json(jsonData);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to generate question" });
  }
};
