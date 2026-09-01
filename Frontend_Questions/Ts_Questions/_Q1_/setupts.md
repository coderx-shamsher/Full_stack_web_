## init a project 

```sh 

npm init -y 

```

## create folders 

```sh 

mkdir src dist 


```

## install typescript 

```sh 

npm i typescript 

## or 

npm i --save-dev typescript 


```

## generate tyep tsconfig

```sh 

npx tsc --init 

```

- make sure to uncomment these folder paths 

```json
{

    "rootDir": "./src",
    "outDir": "./dist",

}
```

## create ts file and code 

```sh 

touch ./src/q1.ts

```


## how to run it ? 

1) _-_ first way 
```sh 

# 1 step 
npx tsc 

# 2 

npm run code 

# 3 run using code js file inside dist foler 
node ./dist/q1.js

```

- code script 
```json 
{
    "code" : "node ./dist/code.js",
    "build" : "npx tsc --watch "
}
```

--- 

## using the  tsx (TypeScript Execute):

```sh 

npx tsc 

npx tsx src/q1.ts   ## this method is not stop if we have an errors in our code so its not much effecient 

## takes some time 
``` 

- Make sure to use first way 