# Server Documentation

This document provides a comprehensive overview of the server architecture, configuration, and controllers for the RealBotAI application. The server is built using Node.js with Express.js framework and follows a modular structure.

## Table of Contents
1. [Configuration](#configuration)
2. [Controllers](#controllers)
3. [API Endpoints](#api-endpoints)
4. [Error Handling](#error-handling)
5. [Security](#security)
6. [Logging](#logging)

## Configuration

### API Configuration (`apiConfig.js`)
- Handles API client configuration with retry logic and timeouts
- Currently configured for OpenAI API
- Features:
  - Base URL configuration
  - Authorization header setup
  - 10-second timeout
  - 3 retry attempts with exponential backoff

### Cloudinary Configuration (`cloudinaryConfig.js`)
- Manages Cloudinary integration for media storage
- Requires:
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

### CORS Configuration (`corsConfig.js`)
- Configures Cross-Origin Resource Sharing
- Production: Restricts to allowed origins from environment variables
- Development: Allows all origins
- Supports common HTTP methods and specific headers

### Database Configuration (`db.js`)
- Manages MongoDB connection using Mongoose
- Features:
  - Connection error handling
  - Connection success logging
  - Process exit on critical errors

### Environment Configuration (`envConfig.js`)
- Centralized environment variable management
- Validates required variables
- Provides defaults for development
- Required variables:
  - `OPENAI_API_KEY`

### JWT Configuration (`jwt.js`)
- Handles JSON Web Token operations
- Features:
  - Token generation with 7-day expiration
  - Token verification
  - Error handling for invalid/expired tokens

### Logger Configuration (`logger.js`)
- Winston-based logging system
- Features:
  - Timestamped logs
  - Console and file output
  - Info level logging by default

### Rate Limiter Configuration (`rateLimiter.js`)
- API request rate limiting
- Features:
  - 15-minute window
  - Dynamic limits based on user plan
  - Custom error message

### Stripe Configuration (`stripeConfig.js`)
- Handles Stripe payment integration
- Features:
  - API version control
  - Environment variable validation
  - Error handling for missing configuration

### Swagger Configuration (`swagger.js`)
- API documentation setup
- Features:
  - OpenAPI 3.0 specification
  - Automatic endpoint discovery
  - Local server configuration

## Controllers

### AI Agent Controller
- Manages AI agent operations
- CRUD operations for AI agents

### AI Controller
- Handles AI response generation
- Integrates with OpenAI API
- Uses text-davinci-003 model

### Analytics Controller
- Manages call analytics data
- Tracks call duration and outcomes

### Auth Controller
- Handles user authentication
- Features:
  - User registration
  - Login with JWT
  - Token refresh
  - Logout
  - Account lockout after failed attempts

### Billing Controller
- Manages subscription plans and payments
- Features:
  - Multiple plan tiers
  - Stripe integration
  - Webhook handling
  - Billing data management

### Campaign Controller
- Manages marketing campaigns
- CRUD operations for campaigns

### Contact Controller
- Manages user contacts
- CRUD operations for contacts

### Extra Minutes Controller
- Handles additional call minutes
- Features:
  - Minute allocation
  - Usage tracking

### Integration Controller
- Manages third-party integrations
- CRUD operations for integrations

### Notification Controller
- Handles user notifications
- Features:
  - Notification creation
  - Retrieval
  - Deletion

### Order Controller
- Manages product orders
- CRUD operations for orders

### Permission Controller
- Manages user permissions
- Features:
  - Permission assignment
  - Permission retrieval

### Product Controller
- Manages products
- CRUD operations for products

### Recording Controller
- Manages call recordings
- Features:
  - Recording storage
  - Transcription via OpenAI Whisper
  - CRUD operations

### Script Controller
- Manages AI scripts
- CRUD operations for scripts

## API Endpoints

All API endpoints follow RESTful conventions and are documented using Swagger. The base URL for the API is `/api/v1`.

## Error Handling

- Consistent error responses
- Status codes:
  - 200: Success
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found
  - 500: Server Error
- Error messages in JSON format

## Security

- JWT authentication
- HTTPS in production
- CORS restrictions
- Rate limiting
- Environment variable protection
- Secure cookie settings for authentication

## Logging

- Winston-based logging system
- Logs stored in `logs/app.log`
- Timestamped entries
- Log levels:
  - Info
  - Error
  - Debug (when enabled)

## Dependencies

- Express.js
- Mongoose
- Winston
- JWT
- Stripe
- Cloudinary
- OpenAI
- Swagger

## Environment Variables

| Variable Name | Description | Required |
|---------------|-------------|----------|
| PORT | Server port | No |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| OPENAI_API_KEY | OpenAI API key | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes |
| STRIPE_SECRET_KEY | Stripe secret key | Yes |
| STRIPE_WEBHOOK_SECRET | Stripe webhook secret | Yes |
| NODE_ENV | Environment (production/development) | No |
| ALLOWED_ORIGINS | Comma-separated allowed origins | Yes (production) |

## Deployment

The server is designed to be deployed in a Node.js environment with the following requirements:

- Node.js v16 or higher
- MongoDB 4.4 or higher
- Environment variables properly configured
- Reverse proxy (e.g., Nginx) for production 