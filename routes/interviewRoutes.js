const express = require("express");
const { analyzeAnswer } = require("../controllers/interviewController");

const router = express.Router();

router.post("/", analyzeAnswer);

module.exports = router;
