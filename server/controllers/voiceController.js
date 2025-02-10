const speech = require("@google-cloud/speech");
const textToSpeech = require("@google-cloud/text-to-speech");

const clientSpeech = new speech.SpeechClient();
const clientTextToSpeech = new textToSpeech.TextToSpeechClient();

exports.transcribeAudio = async (req, res) => {
  const { audioBuffer } = req.body; // Assume audio is sent as a buffer

  try {
    const [response] = await clientSpeech.recognize({
      config: { encoding: "LINEAR16", languageCode: "en-US" },
      audio: { content: audioBuffer },
    });

    const transcription = response.results.map((r) => r.alternatives[0].transcript).join("\n");
    res.status(200).json({ transcription });
  } catch (err) {
    console.error("Speech-to-Text Error:", err.message);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
};

exports.synthesizeSpeech = async (req, res) => {
  const { text } = req.body;

  try {
    const [response] = await clientTextToSpeech.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    });

    res.status(200).send(response.audioContent);
  } catch (err) {
    console.error("Text-to-Speech Error:", err.message);
    res.status(500).json({ error: "Failed to synthesize speech" });
  }
};
