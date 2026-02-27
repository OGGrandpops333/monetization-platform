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
- POST /payment/pay { amount, currency, method }
- GET /api/users
- GET /api/payments
- GET /search?q=productName — Search for products in the in-memory catalog (e.g., /search?q=yoga)

## Environment Variables
- JWT_SECRET: Secret for JWT signing

## Product Catalog & Search
- The app includes an in-memory product catalog and a fast /search endpoint for product lookup.
- To add more products, edit the `products` array in server.js.
- For production, connect to a real database and update the search logic as needed.

## Notes
- For production, replace in-memory DB and product catalog with a real database and integrate a real payment provider.
