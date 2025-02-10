require('dotenv').config();

const envConfig = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/realbotai',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  nodeEnv: process.env.NODE_ENV || 'development',
  openAIKey: process.env.OPENAI_API_KEY
};

// Validate required environment variables
const requiredVars = [
  'OPENAI_API_KEY'
];

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`${varName} is not defined in environment variables.`);
  }
});

module.exports = envConfig;
