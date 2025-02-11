# RealBotAI Server

RealBotAI is an AI-powered platform for creating and managing AI agents, campaigns, and integrations. This repository contains the server-side code for the RealBotAI application.

## Features

- **AI Agent Management**: Create, read, update, and delete AI agents
- **Campaign Management**: Manage marketing campaigns with start/end dates
- **Billing & Subscriptions**: Handle user plans, payments, and extra minutes
- **Analytics**: Track call durations and outcomes
- **Integrations**: Connect with third-party services
- **Recordings**: Store and transcribe call recordings
- **Scripts**: Manage AI agent scripts
- **Notifications**: Send and manage user notifications
- **Authentication**: JWT-based authentication with role-based permissions

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Stripe**: Payment processing
- **OpenAI**: AI capabilities
- **Cloudinary**: Media storage
- **Winston**: Logging
- **Swagger**: API documentation

## Environment Variables

Create a `.env` file in the root directory with the following variables:

plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/realbotai
JWT_SECRET=your_jwt_secret
NODE_ENV=development
OPENAI_API_KEY=your_openai_key
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
ALLOWED_ORIGINS=http://localhost:3000


## Installation

1. Clone the repository
2. Install dependencies:
- npm install
3. Start the development server:
- npm run dev

## API Documentation

API documentation is available via Swagger UI. After starting the server, visit:
http://localhost:5000/api-docs



## Project Structure
server/
├── config/ # Configuration files
├── controllers/ # Route controllers
├── models/ # Mongoose models
├── routes/ # Express routes
├── utils/ # Utility functions
├── app.js # Express application
├── server.js # Server entry point
└── README.md # This file

