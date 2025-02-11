const axios = require('axios');

// Add retry logic and timeouts
const createAxiosInstance = (baseURL, authHeader) => axios.create({
  baseURL,
  headers: { Authorization: authHeader },
  timeout: 10000,
  retry: 3,
  retryDelay: (retryCount) => retryCount * 1000
});

module.exports = {
  openAI: createAxiosInstance(
    'https://api.openai.com/v1/',
    `Bearer ${process.env.OPENAI_API_KEY}`
  )
}; 