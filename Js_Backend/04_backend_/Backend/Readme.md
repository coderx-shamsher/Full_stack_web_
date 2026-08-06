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