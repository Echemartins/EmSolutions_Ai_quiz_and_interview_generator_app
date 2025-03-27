import { useState } from "react";
import axios from "axios";

export default function Interview() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const analyzeAnswer = async () => {
    const response = await axios.post("http://localhost:5000/api/interview", { userAnswer: answer });
    setFeedback(response.data.feedback);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold">AI Interview Feedback</h1>
      <textarea
        className="border p-2 mt-4 w-1/2"
        placeholder="Type your interview answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={analyzeAnswer} className="mt-4 px-6 py-2 bg-purple-500 text-white">Analyze Answer</button>
      {feedback && <p className="mt-4">{feedback}</p>}
    </div>
  );
}
