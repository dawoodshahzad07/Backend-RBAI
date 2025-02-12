const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RealBotAI API',
      version: '1.0.0',
      description: 'Complete API documentation for RealBotAI'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.realbotai.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    './server/routes/*.js', 
    './server/controllers/*.js',
    './server/models/*.js'
  ]
};

const specs = swaggerJsdoc(options);
module.exports = specs; 