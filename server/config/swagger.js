const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RealBotAI API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./server/controllers/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs; 