## Backend Requirements

- keoki ham js k sath backend kr rahe hai to hame Nodejs ko install krna pardta hai
- https://nodejs.org/en/download download and setup this package

## Tech we used today

1. nodejs
2. expressjs
3. postman

## What is Node js and Express js

- _Node.js is a runtime environment that allows you to run JavaScript on a server, while Express.js is a minimalist web framework built on top of Node.js to simplify building web applications and APIs._

Think of Node.js as a car's engine—it provides the raw power and capability to move. Express.js is the steering wheel, dashboard, and pedals—it gives you the tools and structure to easily drive that engine.

### What is Node.js?

- _Node.js is an open-source, cross-platform software environment. Historically, JavaScript could only run inside internet browsers. Node.js changed this by extracting Google Chrome's V8 JavaScript engine, allowing developers to build complete backend applications using JavaScript._

* Core Purpose: Executes JavaScript code directly on a computer or server.

* Architecture: Uses an asynchronous, event-driven, non-blocking I/O model. This means it can handle thousands of concurrent connections efficiently without slowing down.

* System Capabilities: Directly communicates with the operating system to read/write files, manage databases, and listen to network ports.

* Package Manager: Comes bundled with npm (Node Package Manager) to download external libraries.

---

### What is Express.js?

- _Express.js is a lightweight, unopinionated web application framework designed specifically for Node.js. While you can build a web server using raw Node.js, the code quickly becomes complex and repetitive.Express.js provides a clean, abstract layer to handle common web development patterns out of the box._

* Core Purpose: Simplifies the creation of web servers, websites, and RESTful APIs.

* Routing System: Makes it easy to handle different HTTP requests (like GET, POST, PUT, DELETE) pointing to different URLs.

* Middleware Support: Allows you to plug in code snippets to handle tasks like user authentication, logging, and data formatting
  automatically.

* Efficiency: Eliminates boilerplate code, saving hours of configuration time.

_This is the technical intro to nodejs and expressjs_

---

f

```

 1)  ek client jab bhi browser par koi website search krta hai vo us website k server k pass jati hai or server request koi authenticate krta hai to process krne k bad response send krta hai jo ki koi *profile page*, *login page* etc jo bhi user ne request kra hai

------------------------------------------------------------------------------------------------------------

   client sending request                  ------->                  server process and response back
                                           <-------



  it is the request - response cycle

---------------------------------------------------------------------------------------------------------------

  2) the thing is k ham es server create krein jo yeh kam krega k user ki requst koi listen kre and then use reponse kre , yeh ham krtein hai using the "expressjs package"

  NOTE -> maine baki ki theory separate cover kri hai to main yahan basic he cover krunga

  3) browsers using the HTTP protocol to send and receive request/response  from servers

 4) we using the HTTP method to create or code our server using the express js package,


 -----------------------------------------------------------------------------------------

 ## HTTP method ->
  HTTP methods define the specific action a client wants to perform on a server resource.
  They are the verbs of the internet.

  ### Primary HTTP Methods (CRUD Operations)
    GET(): Requests data from a specified resource without changing anything.
     POST(): Submits new data to a server to create a new resource.
       PUT(): Replaces an existing resource entirely with updated data.
         PATCH(): Applies partial modifications to update an existing resource.
           DELETE(): Deletes a specific resource from the server.

  -------------------------------------------------------------------------------------------------

5) ham routing krenge  , routes vo paths hote hain jinpar hamein data milta hai jaise  /users/login  -> es par hame login page milta hai /users/profile -> es par hme user ki profile milti hai etc...

```

- lets code cook now ->

## Setup backend project with npm

```sh

# check
node -v

npm -v

# npm init -y # -y for skip all by default options recommended to go with without -y first

npm init

## after all the options you got a package.json file
```

- Create you entry point file , jo bhi name hamne package.json mein pass kiya hai (Server.js)

```js
console.log("hello backend entry point file");
```

- run with

```sh
 node filename
```

#### Creating package script to run server file

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node Server.js"
  }
```

- maine start name se script create kri hai

```sh
npm run  ## to see all the scripts you have, jo jo ham npm run ki help se run krte hain

npm run start
# or
npm start    # for this file only now

```

## _Now we need To Learn Expressjs_

- go to express offical website

- **how to install**

```sh
npm install express

## to install express into your system
```

- checkout the package file , vese check krne ki jarurat nhi hai but its good to checkout..

**Express js ki website par hamein ek basic code boiler plate milta hai jo ki khuch esa hota hai :-**

```js
const express = require("express"); // this is require import package syntax of commonjs

// 1) hamne kia kiya? ek express name k variable mein 'express' package koi require kra hai tn ki aage use kr lyin

const app = express(); // 2) hame us variable (joki ek function hai ) hamne ek app name ka variable create kra (jo ki  age use krna hai)

const port = 3000;
// 3) its a port variable hamne usse ek port number assign kra hai ( if you study networking its easy to understand )

// app.get() -> ek method hai jo ki requests ko get krta hai , ek  route leta hai  and ek callback jismein ham do arguments pass krte hain jo hai req and res (request and response),
// now ham ek  '/' name ka path par (yeh hai ek route ) kuch res send kr rahein hai jo ki hai hello world ok

// 4) ham multiple respones send kr skte hain with diff routes lets code
app.get("/", (req, res) => {
  res.send("Hello Backend !");
});
app.get("/home", (req, res) => {
  res.send("Hello its home page");
});
app.get("/about", (req, res) => {
  res.send("Hello its about page");
});

// sending html response
app.get("/login", (req, res) => {
  //  like that hame html element koi bhi es response send kr sakte hain
  res.send("<h1> This is login page </h1>");
});

// app.listen () method ka use kra jismein hamne ek port name ka vairable pass kra , and ek callback jismein ham console par rahein hai message..
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

- paste into your entry point js file/ your server file
- **Run you backend server now**

```sh

 npm start

```

- Now hamein ek server create krdiya hai
- GO in browser -> type in url -> localhost:port_number (localhost:3000) you see you response on the page ??
- now just change the path localhost:3000/home
- now just change the path localhost:3000/about etc... see the responses

**NOTE ager hamne koi code update kiya hai server mein to hame use restart krna pardega tn ki code update ho or change save ho just restart your server**

## How to deploy code on production

- kuch khass cheejon koi samja kr hame code koi production mein deploy krte hain ->

1. install a package

```sh

## you can use npm i
npm i dotenv

```

- create file .env just .env
  **ham us file mein filhal port number koi declare kr rahe hain**

```env
PORT=4000
```

- **How to use it now**

1. require it

```js
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
```

- _Now run the server (checkout the port number to verify its working, ager port vahi use ho raha hai jo env mein set hai)_

- **Now code is ready to push on productions**

- Now production mein push krne k liye paise lagte hain keoki koi bhi online cloud service provide k compute power ka miss use huya hai to now koi bhi free nhi hai but ham bad mein ese bhi dekh leinge..

## pusing project on github

1. make sure you know about git and github.. learn it first!!
2. hamein git par node_modules and .env file koi push nhi kran hai add these files into .gitignore

```gitignore

node_modules
.env


```

- NOTE -> make sure k hamein .env koi safe rahkna hai it important most and most

---

## json response to route

```js
// json data 
const jsondata = {
  user1: "coderx",
  Role: "backend",
  user2: "coderx",
  Role: "fronend",
  user3: "coderx",
  ROle: "devops",
};

app.get("/json", (req, res) => {
  res.json(jsondata);
});
```
- restart server and checkout the path /json

--- 
***
  