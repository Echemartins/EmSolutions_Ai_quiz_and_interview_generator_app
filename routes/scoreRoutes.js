const express = require("express");
const { saveScore } = require("../controllers/scoreController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, saveScore);

module.exports = router;
