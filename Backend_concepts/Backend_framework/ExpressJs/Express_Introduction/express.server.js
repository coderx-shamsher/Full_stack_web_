// server.js
// const express = require('express');

import express from 'express'

const app = express();
const port = 3000;

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Hello from Express! serve... ');
});

// Start the server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
