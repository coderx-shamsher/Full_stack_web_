## What is NodeJs
*Node.js is a free, open-source, and cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser.*
*Before Node.js was created by Ryan Dahl in 2009, JavaScript could only run inside web browsers to make web pages interactive. Node.js took Google Chrome's fast V8 JavaScript engine and wrapped it in an environment that can run directly on a computer or server. This shifted JavaScript from a frontend-only language into a tool for full-stack and backend development.*

## Key Characteristics
- Not a language or framework: Node.js is neither a programming language nor a framework. It is a runtime environment that executes standard JavaScript.

- Asynchronous and Event-Driven: It uses a non-blocking I/O (Input/Output) model. Instead of waiting for a task (like reading a database) to finish before moving to the next line of code, Node.js moves on immediately and processes the result when it is ready.

- Single-Threaded: It runs on a single main thread using an event loop, making it incredibly lightweight and efficient at handling thousands of concurrent connections without slowing down.

## What is Node.js Used For?
**Developers use Node.js to build a wide variety of tools and applications:**

- Web Servers & APIs: Powering the backend of web applications, routing data, and handling user authentication.

- Real-Time Applications: Powering instant messaging apps, live chat rooms, online multiplayer gaming, and collaboration tools.

- Command Line Tools: Creating scripts and automation tools directly for the terminal.

- Streaming Applications: Handling data streams efficiently, such as video or audio streaming services


## Javascript Runtime Environment?? 
- javascript runtime environment refers to the environment where your javascript code runs. 

- **in Browsers : js typically runs in the browser ( like chrome or firefox ) to handle frontend tasks.** 

  ### with nodejs 
  - **Nodejs allows js to run outside the browser, on the server and your local computer etc** 
  - it provides tools to interact with the systems, like : 
     - File system ( read/write files ).
     - Network ( handle HTTP Requests ).
     - DataBase ( connect to databases like Relation or non-Relation) etc all other features 


--- 
--- 

### V8 engine : 
*nodejs uses Google Chrome's V8 Engine to Complie javascript into machine code, making it lighting-fast.*

### Built-in APIs: 
*Nodejs comes with built-in APIs ( like fs for file systems or http for servers) so you can build powerful applications without extra libraries.* 


### why do we need node js ? 
**Single language for full stack development:**
 - Developers can use javascript for both frontend and backend, reducing complexity. 
 - for examplem a MERN stack project ( mongoDB, express, react, node). 
 
**High Performance:**
  -  thanks to the v8 engine, nodejs is super fast. 
  - it can handle thousands of simultaneous connections with ease. 

**Event-Driven and Non-Blocking I/O:**
  - Unlike traditional servers that block a thread for each request, nodejs uses an asynchronous model, making it highly efficient for handling multiple tasks. 
  - ager ham js acche se study kr k ayein hai to hame Async-sync programming learn kiya hai to hamein pta hoga ki sync -> means one task at a time, ager function A pahale call kra hai , function B bad mein , to chaahe function B apna task function A se less time mein pura krega , but keoki hamne A ko pahle call kra hai to vo he execute hoga this is synchronous js by default behavior of js..  Async ->  async js mein vo function pahle run hoga jo pahel pana task comlete krega, ager yeh sab a raha hai means hamne js acche se study kiya hai... ! 

  

**Scalable for modern Applications:** 
  - Ideal for real-time applications like chat apps, streaming platforms, or online games.


---
***
*Node js is not a programming language or not a Framework, yeh ek js run time env hai jo allows krta hai developers koi js code ko browser k bahar run krne ka, ham js code ko local machines mein run kr skte hain etc.*
***
--- 
