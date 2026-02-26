// config.js - Environment/config management
require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'changeme',
  // Add more config as needed
};
