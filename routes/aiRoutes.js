const express = require("express");
const { generateAIResponse } = require("../controllers/aiController");
const router = express.Router();

router.post("/generate-response", generateAIResponse);

module.exports = router;
