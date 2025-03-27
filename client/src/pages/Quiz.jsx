import { useState } from "react";
import axios from "axios";
import Sidebar from "../assets/components/Sidebar";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const fetchQuiz = async () => {
    try {
      const response = await axios.post("https://emsolutions-ai-quiz-and-interview.onrender.com/api/generate-quiz", { topic });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (q.options[answers[index]] === q.answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://emsolutions-ai-quiz-and-interview.onrender.com//0/api/score",
        { score: calculatedScore },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Score saved successfully!");
      } else {
        alert("Failed to save score.");
      }
    } catch (error) {
      console.error("Error saving score:", error.response ? error.response.data : error.message);
      alert("An error occurred while saving the score.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-purple-100 to-green-100 min-h-screen p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
          AI-Powered Quiz
        </h1>

        {/* Topic Input Section */}
        <div className="w-full max-w-lg mb-6">
          <input
            type="text"
            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
            placeholder="Enter a topic (e.g., Science, History)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={fetchQuiz}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
          >
            Generate Quiz
          </button>
        </div>

        {/* Questions Section */}
        {questions.length > 0 && (
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
            {questions.map((question, index) => (
              <div key={index} className="mb-6">
                <h2 className="font-medium text-lg text-gray-800">{`${index + 1}. ${question.question}`}</h2>
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="block mt-2 hover:bg-gray-100 px-2 py-1 rounded-md transition-all"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      onChange={() => handleAnswerChange(index, optionIndex)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Submit Quiz
            </button>
          </div>
        )}

        {/* Score Section */}
        {score !== null && (
          <div className="mt-6 text-lg md:text-xl font-bold text-gray-700 text-center">
            Your Score: {score}/{questions.length}
          </div>
        )}
      </div>
    </div>
  );
}
