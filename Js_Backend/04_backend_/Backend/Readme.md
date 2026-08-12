# *how to setup a professional backend project* 

  ## Setup npm project 
  ```sh 
      npm init 

   ```

<!-- - [Model link](https://app.eraser.io/workspace/XesXSDqvSRfOeLgcOBsb) -->

 ## Setup Directories 
 - #### create public 
      - *create temp folder* 
      - *create .gitkeep file for tracking empty folders* 
  - #### create gitignore file 
  - #### create env file in root
  - #### create src folder 
       - *create app, constants, index js files (these all are js files)*
       - *create folder*
         - *controllers -> for features and functionlity*  
         - *db -> for database connections and logics*  
         - *middlewares -> for middle functions*  
         - *models -> for data models*  
         - *routes -> for routing operations*  
         - *utils -> for repeatative functions and features*  
```sh

❯ mkdir public && mkdir ./public/temp  

❯ touch .gitignore && touch ./public/temp/.gitkeep

❯ touch .env 

❯ mkdir src  ## for code files 

❯ touch src/app.js && touch src/constants.js && touch src/Server.js 

❯ mkdir controllers db middlewares models routes utils 

```
- change the type in package json -> commonjs to module we using module in this  

```json

 "type": "module",

```

- install nodemon as dev dependencies
```sh 

npm i -D nodemon

```

- create script for server 

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev"  : "nodemon src/Server.js"
  },
```


- install prettier 
```sh

npm i prettier

touch .prettierrc ## config file 

touch .prettierignore

```
- #### config prettierrc file -> 
```json

    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 4, 
    "semi": true,
    "trailingComma": "es5"    


```

- #### prettierignore config 

```json
/node_modules
/dist

*.env
.env.* 

```

---
---

# How to connect database in MERN with debugging 
- first go and search mongodb atlas -> signup and setup all important thinks if need help than checkout online !! 

- **How to connect database now**
- into env
- remove ending / from mongodb string 

#### db name in constants
```js 
export const DB_Name = "CoderxTestUser"
```

#### Install packages ->> 
```sh 

npm i express dotenv mongoose 

```  

### First way to connect database 
**Server.js**
- tip : always wrap code of connect in try-catch and also apply async-await 

```js 
import mongoose from "mongoose";
import { DB_Name } from "./constants.js";


import express from "express"
const app = express()
// using the self invoking functions
(  async () => {
     try {
        await mongoose.connect(`${process.env.DB_connection_String}/${DB_Name}`);
        // app.on -> yeh ek listener hai jo ki express connect errors ko handle krta hai
          
        app.on("error", (error)=>{
            console.log("Error: express connection failed with db...",error)
            throw error
        })
        
    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
})();

```
- ager self invoking function nhi use krna to ham arrow yan normal functions bhi use kr sakte hain ! 
- yeh tareeka bhi good hai but hamne index file mein he sb kuch kr liya to hame ese better kr sakte hain.. 

--- 

### second way to connect 
- create file into db folder 
```sh 

touch src/db/connection.js

```

- **Into connection.js** 

```js 

import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const ConnectDB = async () => {
    try {
        // now ese ek vairable mein wrap kro and connection host ko console kro 
        //// await mongoose.connect(`${process.env.DB_connection_String}/${DB_Name}`)
        
       const mongodbConnection =   await mongoose.connect(`${process.env.DB_connection_String}/${DB_Name}`)
        console.log(`\n Mongodb Connected !! 🌐 DB HOST : ${mongodbConnection.connection.host}`)      
        // yeh ek checkpoint hai k hamara database mein kona host hai or ham kisse connected hai 

    } catch (error) {
        console.error("Error: Mongdb Connection Error", error);
        console.log("\nError: Mongdb Connection 🌐 Failed... ❌ \n", error);
        process.exit(1)  // learn about it 
    }
}

export default ConnectDB 
```

### import into index.js 
 -  **import your db connection js file function into this server js file and let setup next  ->**
 -  #### config env with dotenv package 
**recommended to checkout npm website** 
```js
// 1) step is to setup dotenv , keoki hamein env variables bhi load krne honge usi time par jab mera server load hoga  and first hame use setup krna hoga 

import 'dotenv/config'

import ConnectDB from "./db/connection.js";



// calling function
ConnectDB()
```
--- 

- modifyed package json script for loading env variables 
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/Server.js",
    "test_0": "nodemon  -r dotenv/config src/Server.js",
    "test_01": "nodemon  src/Server.js"
  },
```
- *Enh sabhi koi run kr k dekho kis script mein error a raha hai, ager kisi mein bhi nhi aya to matlab koi bhi script koi bhi ek script is good jaruri nhi k expreimental etc flags use krein hai..*

--- 

### RUN and Test the Connection of db 
```sh 

npm run dev 

```
- Result ->> if ->  Mongodb Connected !! 🌐 DB HOST : your-hostname | it means k connnection ho gya hai... yeahhhhh it is hamne connection bana liya...

> NOTE : *its important to read error if you have any of them , keoki errors ko read kr k, fir smj k than solution miltahai*


---
---

<!-- that's is for today......  -->

---
***

# Custom API Response and Error handling and other important things

```sh 

npm i express

```
- now we are making express server in app.js

```js
import express from 'express'

const app = express() 

export default app 
```

- NOTE _> jab bhi hamne async function ko use kiya hai to hame vo promise return krta hai, hamein us promise koi resolve krna hota hai let do this, hamne serverjs mein db connection ko import kiya hai to hamein jo bhi promise return hoga use handle krna hoga.. let goo -> 

```js 
ConnectDB()
    .then(() => {
        // connect port of app in this with app sever connection success message
        
        const Listen_port = process.env.Port || 4080;

        app.listen(Listen_port, () => {
            console.log(` ♾️  Server is Running at localhost:${Listen_port}`);
        });
    })
    .catch((err) => {
        console.error("\n Error : MongoDB DB connection failed !!! ‼️ ");
    });

```
---
- Error handling in app server ->
```js

import express from 'express'

const app = express() 

// error handling 
app.on("Error",(error)=>{
    console.log("Error : Express Connection failed with DB \n", error)
    throw error
})

export default app 

```
- Important to checkout -> Express documentation[express documentation](https://expressjs.com/en/5x/api/)

- checkout the api documentation 

## Important packages -> 
1) **cookie-parser**
- *cookie-parser is a popular Node.js NPM middleware for Express ExpressJS Cookie-Parser. It parses the Cookie header on incoming HTTP requests and populates req.cookies with an object keyed by cookie names, enabling easy access to user session data and preferences.*

### ⚙️ How to Install
Run
```sh 
npm install cookie-parser 
```
in your project terminal.

2) **CORS**
- *The cors npm package is a Node.js middleware for Express and Connect applications used to easily enable and configure Cross-Origin Resource Sharing (CORS)*

### ⚙️ Installation
- To install the package in your project, run the following command in your terminal:
```bash
npm install cors
```

- we see how to use those both 
--- 

> **Setup CORS ->** 
- 1) ham cors ko config kr rahe hain ! cors k ander object -> origin means konsa konsa frontend hamein hamare server par data send kr skta hai request kr skta hai tnki cors ka error na aye keoki hame specific addresses koi he allow krna hota hai. 
- 2) credentials : true krna hai 

```js 
// cors config
app.use(cors({
    origin : process.env.CORS_ORG,
    credentials : true
}))

```

#### setup the json() with limit 
- keoki ham ek limit mein he data accept krenge. lets setup 
```js
 // json() -> for accepting data json data with limit 
 app.use(express.json({limit:"20kb"}))

``` 
- now we dont need body-parser in express to accept json data. 

### URL Encoders in express setup -> 
- setup express urlencoders 
```js 
app.use(express.urlencoded({extended:true, limit: "20kb"}))
```

### static public folder for servering public files 
```js 
// setup static file severing using express static 
app.use(express.static('public'))

```
- make sure you have public folder, vese jaruri nhi eska name public ho but its standard practice so lets keep it..


--- 
--- 

## making some utils 
- wraping functions to handle async-await operations so , hamein bar bar usi try-catch koi add na krna parde har jagah code base mein

**in utils make file -> Async_Handler**

```js 
// higher order functions

// with try-catch
// const AsyncHandler = (func) => {
//     async (req, res, next) => {
//         try {
//             await func(req, res, next);
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     };
// };

// other syntax
const AsyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
};

// promise based

const promise_based_async_handler = (_function_) => {
    (req, res, next) => {
        Promise.resolve(_function_).catch((error) => {
            next(error);
        });
    };

};// not using this function  



export default AsyncHandler

```
---

### Node js APi errors handling 
- checkout nodejs api errors documentations 

```js 
class ApiErrors extends Error {
    constructor(
        statuscode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
      // using super 
      /// overwriting message
      super(message)
      this.statusCode = statuscode
      this.data = null
      this.message = message
      this.success = false
      this.errors = errors
   
      // in production based logic 
      if(stack){
         this.stack = stack
      }else{
        Error.captureStackTrace(this, this.constructor)
      }
    }
}

// export class 

export default ApiErrors

```


### Api Response error handling
```js 

class Api_response {
    constructor(statusCode, data,message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

```
