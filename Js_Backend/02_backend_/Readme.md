# Connecting Frontend to backend 

- create Backend and Frontend 

##  *Backend setup*
*setup backend here* 
```sh 
npm init 

# install express
npm i express

touch Server.js

```
- **script for server**
```json 
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node Server.js"
  },
```

- *Now let use express with module js syntax*
first change the type in package.json 
```json
{
   "type": "module",
   "main": "Server.js",
}

```

### Setup express js server 
```js
// this is the module js syntax 

import express from "express"
import 'dotenv/config'

const app = express()

// ager port env mein nhi hai to 4000 hamne provide kra hai hardcoded 
const PORT = process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.send("server is ready to rolll...")
})

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
})


```

- **Setup env**
main esmein port setup kr rha hun 

```sh 
 npm i dotenv 
```
- create a file .env and assign a port 


--- 

## first operation 
```js

// json dummy data

const UserData = [
  { id: 101, username: "testuser", admin: false },
  { id: 102, username: "user0x", admin: false },
  { id: 103, username: "athena", admin: false },
  { id: 104, username: "bob", admin: false },
  { id: 105, username: "coderx", admin: true },
  { id: 106, username: "user06", admin: false },
  { id: 107, username: "admin07", admin: true },
  { id: 108, username: "user08", admin: false },
  { id: 109, username: "archuser", admin: false },
  { id: 110, username: "ubuntu", admin: false },
];

// first route with data 
app.get('/users',(req,res)=>{
     res.json(UserData)
})

```
- start the server and checkout the data on browser 

- NOTE install json viwer pro for better json formating on browser it browser extesion 

***
--- 

## *Frontend setup*
*setup fronend*
- main frontend mein vite package bundler use kr rha hun (Fronend with React)

```sh 

cd Frontend 

npm create vite@latest . 

npm install --ignore-scripts 

``` 

- **npm run dev** to run frontend server 

**Appjsx code**
```jsx 

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Full stack Test App</h1>
          <p>
            <em>
              This is Fronend with Backend how to connect frontend with backend
              its a full stack kind of practice
            </em>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
      <section id="spacer"></section>
    </>
  );
}

export default App;

```

### First operations 

```jsx
function App() {
  const [user, setuser] = useState([]);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Full stack Test App</h1>
          <p>
            <em>
              This is Fronend with Backend how to connect frontend with backend
              its a full stack kind of practice
            </em>
          </p>
        </div>
        <div id="Usersection">
          <h2>Users 👋</h2>

          {
            user.map((user) => {
              return (
                <section key={user.id}>
                  <h2> Username = {user.username}</h2>
                  {
                    user.admin === true ? <p><strong>Admin User</strong></p> : "Normal user"
                  }
                </section>
              )
            })
          }

        </div>
        
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
      <section id="spacer"></section>
    </>
  );
}

```
- state create kri or user koi loop kra in jsx or ek special conditional rendering kri 

--- 

> **install data fetch package -> axios 
```sh

npm i axios

```

- Now use it on fronend app 
**App.jsx**
```jsx

function App() {
  const [user, setuser] = useState([]);
  
  function getdata(){
    axios.get('http://localhost:4000/users')
    .then((Response)=>{
       setuser(Response.data)
    })
    .catch((err)=>{
       console.log(err);
       console.error(err);
    })
  }

// 1 maine ek function create kiya jo data fetch krta hai


  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Full stack Test App</h1>
          <p>
            <em>
              This is Fronend with Backend how to connect frontend with backend
              its a full stack kind of practice
            </em>
          </p>
        </div>
        <div id="Usersection">
          <h2>Users 👋</h2>

          {
            user.map((user) => {
              return (
                <section key={user.id}>
                  <h2> Username = {user.username}</h2>
                  {
                    user.admin === true ? <p><strong>Admin User</strong></p> : "Normal user"
                  }
                </section>
              )
            })
          }

        </div>

        <button
          type="button"
          className="counter"
          onClick={getdata}
        >
          fetch data 
        </button>

        {/* vo data button k click par load hoga*/}
      </section>
      <section id="spacer"></section>
    </>
  );
}

```


- Now start the Frontend and Backend server both 


## the Cors Error 
-  Access to XMLHttpRequest at 'http://localhost:4000/users' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

## CORS 
CORS ek browser security feature hai jo decide karta hai ki aapka frontend (origin A) kisi doosre origin (domain/port/protocol) se data le sakta hai ya nahi. Aapko jo error aa raha hai, uska reason yeh hai ki backend response mein required CORS header `Access-Control-Allow-Origin` nahi aa raha, isliye browser request ko block kar raha hai. [learn.microsoft](https://learn.microsoft.com/en-us/answers/questions/1413247/cors-policy-no-access-control-allow-origin-header)

***

## CORS ka main idea

- CORS ka full form hai **Cross-Origin Resource Sharing**. [learn.microsoft](https://learn.microsoft.com/en-us/answers/questions/1413247/cors-policy-no-access-control-allow-origin-header)
- Browser “same-origin policy” follow karta hai: agar frontend ka origin aur backend ka origin alag ho (domain, protocol, ya port), to direct Ajax/fetch request block ho sakti hai. [stackoverflow](https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i)
- CORS extra HTTP headers (jaise `Origin`, `Access-Control-Allow-Origin`, etc.) use karta hai taaki server bata sake ki kaun‑kaun origins ko access allowed hai. [stackoverflow](https://stackoverflow.com/questions/46785318/the-cors-header-access-control-allow-origin-is-missing)

***

## Aapke error ka exact reason

Error:  
> Access to XMLHttpRequest at 'http://localhost:4000/users' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin)

Iska matlab:  

- Aapka frontend origin: `http://localhost:5173` (example: Vite/React dev server).  
- Aapka backend origin: `http://localhost:4000` (Node/Express ya koi aur API server).  
- Dono ka **port alag hai**, isliye browser inko *different origin* maan raha hai (scheme + hostname + port teeno same hone chahiye). [stackoverflow](https://stackoverflow.com/questions/31276220/cors-header-access-control-allow-origin-missing)
- Jab browser request bhejta hai, woh header `Origin: http://localhost:5173` lagata hai. [stackoverflow](https://stackoverflow.com/questions/35588699/response-to-preflight-request-doesnt-pass-access-control-check-no-access-con)
- Backend response mein `Access-Control-Allow-Origin` header nahi hai, isliye browser kehta hai “CORS header missing” aur response ko JavaScript se access karne se block kar deta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin)

***

## Yeh error kab occur hota hai (common cases)

- Jab frontend aur backend **different port** use karein (5173 vs 4000) chahe hostname same ho. [stackoverflow](https://stackoverflow.com/questions/31276220/cors-header-access-control-allow-origin-missing)
- Jab frontend se `fetch`/`XMLHttpRequest` se call ho raha hai, aur server ne us origin ko `Access-Control-Allow-Origin` se allow nahi kiya. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin)
- Jab request me kuch special headers/methods (e.g. `Authorization`, `PUT`, `DELETE`) hote hain to browser pehle **preflight (OPTIONS)** request bhejta hai; agar uska response CORS rules pass nahi kare to bhi error aata hai. [descope](https://www.descope.com/blog/post/cors-errors)

***

## CORS ke main points (concepts jo learn karne chahiye)

- **Origin definition**: origin = protocol + hostname + port; inme se kuch bhi change ho to origin change ho jata hai. [stackoverflow](https://stackoverflow.com/questions/31276220/cors-header-access-control-allow-origin-missing)
- **Same-Origin Policy**: default rule jisme browser cross-origin requests ko restrict karta hai (security reasons, XSS, CSRF se bachne ke liye). [stackoverflow](https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i)
- **CORS headers** (server side):  
  - `Access-Control-Allow-Origin`: kon se origin(s) allowed hain (e.g. `http://localhost:5173` ya `*`). [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin)
  - `Access-Control-Allow-Methods`: allowed HTTP methods (GET, POST, PUT, DELETE…). [descope](https://www.descope.com/blog/post/cors-errors)
  - `Access-Control-Allow-Headers`: allowed custom headers (Authorization, Content-Type, etc.). [descope](https://www.descope.com/blog/post/cors-errors)
  - `Access-Control-Allow-Credentials`: agar cookies/Authorization header bhejne hain to isko `true` karna padta hai, aur origin `*` nahi ho sakta. [stackoverflow](https://stackoverflow.com/questions/35588699/response-to-preflight-request-doesnt-pass-access-control-check-no-access-con)
- **Preflight request**: browser pehle `OPTIONS` request bhej ke check karta hai ki cross-origin call allowed hai ya nahi; agar is response me sahi CORS headers nahi honge to main request block ho jayegi. [descope](https://www.descope.com/blog/post/cors-errors)
- **Browser-only mechanism**: CORS sirf browser enforce karta hai, isliye Postman, curl, ya server‑side code se same API call karein to error nahi aata. [stackoverflow](https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i)

***

## Is error ko kaise solve karein (localhost case)

Solution hamesha **backend** par lagta hai, frontend par nahi, kyunki CORS headers server set karta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin)

### 1. Node/Express + `cors` package use karna (recommended)

Agar aap Node + Express use kar rahe hain:  

```js
// server.js ya index.js
const express = require('express');
const cors = require('cors');

const app = express();

// simple allow for your frontend origin
app.use(cors({
  origin: 'http://localhost:5173'  // yahan apna frontend origin
}));

// agar sab endpoints ke liye CORS chahiye to upar ki line kaafi hai
app.get('/users', (req, res) => {
  res.json([...]);  // aapka data
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
```

Yeh `cors` middleware automatically response me `Access-Control-Allow-Origin: http://localhost:5173` add karega, aur aapka error hat jayega. [medium](https://medium.com/@oshara.16/common-cors-errors-and-how-to-fix-them-explained-using-nodejs-backend-6b60c46c13cb)

Agar development me temporary sab origins allow karna ho:  

```js
app.use(cors());  // default: Access-Control-Allow-Origin: *
```

Par production me `*` use karne se pehle security sochna zaroori hai. [stackhawk](https://www.stackhawk.com/blog/fixing-no-access-control-allow-origin-header-present/)

### 2. Agar aap server ko khud configure kar rahe (without package)

Express me manually header set kar sakte hain:  

```js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

Yeh bhi same kaam karega: browser ko batayega ki `http://localhost:5173` se aane wali request allowed hai. [descope](https://www.descope.com/blog/post/cors-errors)

### 3. Agar aap server control nahi karte

Kabhi‑kabhi aap third‑party API hit kar rahe hote ho jiska CORS aap change nahi kar sakte. [stackoverflow](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe)
Is case me common workarounds:  

- Apne backend se request forward karo (frontend → aapka server → third‑party API); CORS sirf frontend vs aapka server ke beech check hoga. [stackhawk](https://www.stackhawk.com/blog/fixing-no-access-control-allow-origin-header-present/)
- Development me **CORS proxy** use kar sakte ho, jo aapke liye CORS headers add kar de (sirf testing ke liye, production me recommended nahi). [descope](https://www.descope.com/blog/post/cors-errors)

***

## Practical checklist (aapke case ke liye)

1. Confirm karein frontend origin: browser console me Network tab → request headers me `Origin: http://localhost:5173` dekh sakte hain. [learn.microsoft](https://learn.microsoft.com/en-za/answers/questions/1350282/cross-origin-request-blocked-the-same-origin-polic)
2. Backend (`http://localhost:4000/users`) ke response headers check karein; wahan `Access-Control-Allow-Origin` aana chahiye, ideally `http://localhost:5173` ya `*` development ke liye. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin)
3. Agar request me cookies/Authorization headers bhej rahe hain to server pe `Access-Control-Allow-Credentials: true` set karein, aur frontend pe `fetch(..., { credentials: 'include' })` use karein; saath me origin exact string honi chahiye, `*` nahi. [stackoverflow](https://stackoverflow.com/questions/35588699/response-to-preflight-request-doesnt-pass-access-control-check-no-access-con)
4. Preflight (OPTIONS) request fail ho raha ho to uska response bhi CORS headers ke saath configure karein (Express me `cors` middleware usually automatic handle kar leta hai). [descope](https://www.descope.com/blog/post/cors-errors)

***
---

> *ager hamari 2 websites ka url same nhi hai ! toh yeh ek CORS , ager port same nhi hai toh bhi vo CORS hai (cross origin resource sharing) , means ager url and port dono same nhi hai to cors ka error ayega...*


#### Api standards 
**update you backend route path with this syntax**
```js
app.get('/api/users',(req,res)=>{
     res.json(UserData)
})

```

#### React proxy setup 
- first hame app mein se axios mein jo localhost url pass kiya hai cut kro 

```jsx
   axios.get('/api/users')
```

**yeh hamne vite use kra hai to uske acorrding setup krna**
- go into viteconfig 

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy : {
      '/api' : 'http://localhost:4000'
    }
  },
  plugins: [react()],
})


```
>NOTE -> 1) hamne server object k ander ek proxy name ka object declare kra , 2) uske ander ek key set kro jo ki hai '/api' : usski value jo ki mera localhost address hai , ese hoga kiya k jab bhi mera server /api par koi request ati hai to uske agge apne app mera localhost address append hojayega, -> main point keoki hamne ek proxy set kri hai to server koi lagega ki jo bhi request a rahi hai esi address se a rahi hai same origin hai... 

- run both servers and checkout   
- *Now chekout Cors ka error solve ho gya..... need to understand this concept clear..* 

- **task click on the button and you got all users in ui**

---

2) **url white listing** yeh kam hai backend ka 
checkout the cors npm website for reff..

--- 
--- 

<!--  thats it for today i learned alot  -->