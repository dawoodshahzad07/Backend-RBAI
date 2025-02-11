// Import necessary modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const expressStatusMonitor = require('express-status-monitor');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Path to your swagger.json

// Load environment variables
dotenv.config();

// Import utilities, middlewares, and routes
const { connectToDatabase } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const contactRoutes = require("./routes/contactRoutes");
const integrationRoutes = require("./routes/integrationRoutes");
const recordingRoutes = require("./routes/recordingRoutes");
const twilioRoutes = require('./routes/twilioRoutes');

// Import services
// const twilioService = require('./services/twilioService');
const openAIService = require('./services/openAIService');
const speechToTextService = require('./services/speechToTextService');
const textToSpeechService = require('./services/textToSpeechService');
const dialogflowService = require('./services/dialogflowService');
const mongoService = require('./services/mongoService');

// Initialize the app
const app = express();

// Apply middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logger for development
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(expressStatusMonitor({
  title: 'API Status',
  path: '/status',
  spans: [{
    interval: 1,            // Every second
    retention: 60           // Keep 60 data-points in memory
  }]
}));

// Connect to the database
connectToDatabase();

// Define API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/integrations", integrationRoutes);
app.use("/api/recordings", recordingRoutes);
app.use('/api', twilioRoutes);

// Example route using multiple services
app.post('/api/voice-interaction', async (req, res) => {
  try {
    const { audio, userId } = req.body;
    
    // Convert speech to text
    const transcript = await speechToTextService.transcribeAudio(audio);
    
    // Get AI response
    const aiResponse = await openAIService.generateResponse(transcript);
    
    // Convert text to speech
    const audioResponse = await textToSpeechService.synthesizeSpeech(aiResponse);
    
    // Save conversation to MongoDB
    await mongoService.saveConversation(userId, {
      input: transcript,
      output: aiResponse,
      audio: audioResponse
    });

    res.status(200).json({ audio: audioResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API Information',
      contact: {
        name: 'Developer'
      },
      servers: ['http://localhost:5000']
    }
  },
  apis: ['./routes/*.js'] // Path to your API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Default route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the API. Use the endpoints to access the application.",
    });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
