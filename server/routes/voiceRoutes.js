const express = require("express");
const { transcribeAudio, synthesizeSpeech } = require("../controllers/voiceController");
const router = express.Router();

router.post("/transcribe-audio", transcribeAudio);
router.post("/synthesize-speech", synthesizeSpeech);

module.exports = router;
