const express = require("express");
const { generateQuiz } = require("../controllers/quizController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/generate-quiz", generateQuiz);

module.exports = router;
