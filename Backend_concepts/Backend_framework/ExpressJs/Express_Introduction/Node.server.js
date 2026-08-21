// server.js
// const http = require('http');
import http from 'http'

const hostname = '127.0.0.1';
const port = 3000;

// Create the server instance
const server = http.createServer((req, res) => {
  // Set the response HTTP status and headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send the response body text
  res.end('Hello! From Node http server... \n');
});

// Start listening for requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
