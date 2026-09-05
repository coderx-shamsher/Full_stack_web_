## setup typescript for your ts coding 


```sh 

npm init -y 

npm i --save-dev typescript 


npx tsc --init 

```

- Create src and dist folders and also create .ts file inside src 

#### uncomment the root and outer dir 

- script script to run code 

```json 
 "scripts": {
    "code" : "node ./dist/code.js",
    "build" : "npx tsc --watch" 
  },

```

- npm run -> 