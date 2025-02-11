const mongoose = require('mongoose');
const envConfig = require('../config/envConfig');

const connectDB = async () => {
  try {
    if (!envConfig.mongoURI) {
      throw new Error('MongoDB connection URI is not defined');
    }
    
    await mongoose.connect(envConfig.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add these options for better connection handling
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process only if it's a critical connection error
    if (error.name === 'MongooseServerSelectionError') {
      process.exit(1);
    }
  }
};

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;

exports.saveConversation = async (userId, conversationData) => {
  try {
    const conversation = new Conversation({
      userId,
      ...conversationData
    });
    return await conversation.save();
  } catch (err) {
    throw new Error(`MongoDB Save Error: ${err.message}`);
  }
};

exports.getUserConversations = async (userId) => {
  try {
    return await Conversation.find({ userId }).sort({ timestamp: -1 });
  } catch (err) {
    throw new Error(`MongoDB Fetch Error: ${err.message}`);
  }
}; 