# Monetization App Documentation

## Features
- User authentication (JWT)
- Payment processing (demo endpoint)
- In-memory database (users, payments)
- REST API endpoints
- Frontend dashboard (dashboard.html)
- Environment/config management (.env)
- Error handling and logging

## Usage

1. Install dependencies:
   npm install

2. Start the server:
   node server.js

3. Open in browser:
   http://localhost:3000/dashboard.html

## API Endpoints

- POST /auth/register { username, password }
- POST /auth/login { username, password }
- GET /protected (JWT required)
- POST /payment/pay { amount, currency }
- GET /api/users
- GET /api/payments

## Environment Variables
- JWT_SECRET: Secret for JWT signing

## Notes
- For production, replace in-memory DB with a real database and integrate a real payment provider.
