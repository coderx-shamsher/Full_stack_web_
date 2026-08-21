# What is Express js 
- *Express.js (commonly referred to as Express) is a minimalist, flexible, and open-source web application framework for Node.js. It is considered the de facto standard server framework in the Node.js ecosystem, specifically designed to build web applications, backend servers, and RESTful APIs*

> To clarify a common point of confusion: you actually cannot use Express without Node.js. Node.js is the engine, while Express is the steering wheel.Here is why we don't use only Node.js, and why we add Express instead:

- Node.js alone is too difficult: Building a website using only Node.js requires writing hundreds of lines of complex, repetitive code for basic tasks like handling URLs or managing user data.

- Express makes it fast and simple: Express provides pre-built shortcuts that let you build servers, APIs, and web routes in just a few clean, easy-to-read lines of code.

- Express handles the heavy lifting: It automatically manages complex backend tasks like security, cookies, and error handling so you can focus entirely on building your application features.


--- 

## lets compare nodejs server code vs expressjs server code -> 

> **nodejs server code** 
```js 

// server.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create the server instance
const server = http.createServer((req, res) => {
  // Set the response HTTP status and headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send the response body text
  res.end('Hello, World!\n');
});

// Start listening for requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```
> run the file and checkout he localhost 
```sh 

node nodeserver.js

```
---


> *expressjs server code*

- you need to install express 

```sh 

npm i express

```


```js 
// server.js
const express = require('express');
const app = express();
const port = 3000;

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

```
> run your express server code file with 

```sh 
node express.server.js
```
