import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-purple-200 text-center">
      {/* Title Section */}
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-purple-700">
          Welcome to <span className="text-green-600">EMsolutions</span> AI Quiz & Interview App
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-8">
          Enhance your skills by taking quizzes or practicing interviews!
        </h2>
      </div>
      {/* Options Section */}
      <div className=" grid gap-6 sm:grid-cols-2">
        {/* Quiz Card */}
        <div className=" bg-blue-500 text-white rounded-lg shadow-lg transform hover:scale-105 hover:bg-blue-700 transition-transform duration-300">
          <div className="p-6 mb-4">
            <h3 className="text-2xl font-semibold mb-2">Take a Quiz</h3>
            <p className="mb-4">
              Test your knowledge across various fields and topics by taking a random quiz.
            </p>
            <Link
              to="/quiz"
              className="bg-white text-blue-500 font-medium py-2 px-4 rounded-full shadow hover:bg-blue-100 transition-colors"
            >
              Start Quiz
            </Link>
          </div>
        </div>
        {/* Interview Card */}
        <div className="bg-purple-500 text-white rounded-lg shadow-lg transform hover:scale-105 hover:bg-purple-700 transition-transform duration-300">
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">Practice Interview</h3>
            <p className="mb-4">
              Prepare for job interviews by answering AI-generated questions in various domains.
            </p>
            <Link
              to="/interview"
              className="bg-white text-purple-500 font-medium py-2 px-4 rounded-full shadow hover:bg-purple-100 transition-colors"
            >
              Start Practice
            </Link>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-600">
        © 2025 EMsolutions. All rights reserved.
      </footer>
    </div>
  );
}
