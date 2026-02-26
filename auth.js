// User authentication setup using JWT and bcrypt
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const { users } = require('./db');
const { JWT_SECRET } = require('./config');

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const uname = username && username.toLowerCase();
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const existing = users.find(u => u.username.toLowerCase() === uname);
  if (existing) {
    return res.status(409).json({ error: 'User exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  res.json({ message: 'User registered' });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const uname = username && username.toLowerCase();
  const user = users.find(u => u.username.toLowerCase() === uname);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Auth middleware
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { router, authenticate };