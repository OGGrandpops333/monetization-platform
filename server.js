// In-memory product catalog
const products = [
  { id: 1, name: 'Yoga Mat', price: 25.99 },
  { id: 2, name: 'Resistance Bands', price: 15.99 },
  { id: 3, name: 'Dumbbells', price: 45.00 },
  { id: 4, name: 'Foam Roller', price: 19.99 },
  { id: 5, name: 'Jump Rope', price: 9.99 }
];

// Fast product search endpoint
app.get('/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json([]);
  const start = Date.now();
  const results = products.filter(p => p.name.toLowerCase().includes(q));
  const elapsed = Date.now() - start;
  if (elapsed > 200) {
    console.warn(`WARN: Slow search detected: ${elapsed}ms for "${q}"`);
  }
  res.json(results);
});
const express = require('express');
const path = require('path');
const { router: authRouter, authenticate } = require('./auth');
const paymentRouter = require('./payment');
const { users, payments } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple request logging
app.use((req, res, next) => {
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);

// REST API endpoints (demo)
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ username: u.username })));
});

app.get('/api/payments', (req, res) => {
  res.json(payments);
});

// Example protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
