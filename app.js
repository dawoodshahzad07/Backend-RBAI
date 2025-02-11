// Import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Ensure this file exists

// Add Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 