const fs = require('fs');
const OpenAI = require('openai');

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: "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"
});

async function transcribeAudio() {
  try {
    const audioFile = fs.createReadStream('test.mp3');
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1"
    });

    console.log(transcription.text);
  } catch (error) {
    console.error('Error transcribing audio:', error);
  }
}

transcribeAudio(); 