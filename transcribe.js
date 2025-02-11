const fs = require('fs');
const OpenAI = require('openai');

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: "your_key_here"
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