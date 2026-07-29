# <<<---- Reactjs --->>> 

 ![React logo ](./src/assets/react.svg)
![react logo]( /src/assets/hero.png )
![react logo]( /src/assets/vite.svg)
# how to install or create react project using the vite 

```bash

npm create vite 

## or ham npm create vite@latest bhi kr sakte hain 
# give project folder name , tech stack react + javascript or eslint.config.js choose your ! or ager react app server abhi suru krna ha to yes krna nhi to bad mein suru kr sakte ho 

```

## first need to change the directory to react project 
``` bash

cd your_react_project_foldername

npm install 

## or you can use only the npm i 

```

## to run react app server 
``` bash 

npm run dev 

# run the react server script 

```

## folder structure of react 


| File/Folder | Why it is there | What it does |
|---|---|---|
| `node_modules/` | Created after running `npm install`. | Contains all installed project dependencies. |
| `public/` | Included by Vite for static assets. | Stores files that are served directly without going through the React build process. |
| `src/` | Main source folder of the React app. | Contains components, styles, assets, and application logic. |
| `src/assets/` | Common default folder inside `src`. | Stores images, icons, and other assets imported into React components. |
| `src/App.css` | Stylesheet for the main App component. | Adds CSS styling for `App.jsx`. |
| `src/App.jsx` | Main root component in many React apps. | Defines the main UI structure rendered by the app. |
| `src/Frontend.jsx` | Custom component created by you. | Usually contains a separate part of the UI or a feature component used inside `App.jsx` or elsewhere. |
| `src/index.css` | Global stylesheet. | Applies base styles to the whole app, such as body styling, fonts, reset styles, or layout defaults. |
| `src/main.jsx` | Standard Vite React entry file. | Connects React to the DOM and renders the root `App` component into the HTML page. |
| `.gitignore` | Added for Git projects. | Tells Git which files and folders should not be tracked, such as `node_modules` or build files. |
| `eslint.config.js` | Added when ESLint is set up. | Defines linting rules to help keep code clean and catch mistakes. |
| `index.html` | Required by Vite as the main HTML file. | Provides the root HTML page where the React app is mounted. |
| `package-lock.json` | Automatically created by npm. | Locks exact dependency versions so installs stay consistent. |
| `package.json` | Core npm project file. | Stores project metadata, scripts, and dependency lists. |
| `README.md` | Default documentation file for the project. | Usually explains how to install, run, and understand the project. |
| `vite.config.js` | Added by Vite. | Contains Vite configuration such as plugins, aliases, server settings, or build options. |


---
##  structure how react app work 

1) index.html 
is file mein ek root id name say ek div hota hai jisemein he react k app.jsx ka code show hota hai  
        
        App.jsx 
          |
          |
          |
       Main.jsx
          |
          |
          |
       index.html 

2) main.jsx mein ham react createRoot() method ki help say ek root element create krte hain in index.html to usmein render krwate hain app.jsx function ko...

       NOte jsx mein hm function ko  
         1)  
            App() 

         2) <App />

    or yeh dono he vaild hai koi error issue nhi hoga... 

3) index.html mein he sara app ka code render hota hai ek trah se sara jsx code html or javascript mein covert hota hai jab browser par run hota hai... 

--- 
## eslint.config.js
ek linting configuration file hoti hai. Iska kaam JavaScript/React code ko check karna hota hai taake errors, bad style, aur code mistakes pehle hi pakar li jayein.
es file mein ham react/js code k liye rules set kr sakte hain tnki code clean , consistent aur mistakes -free bana rahe 


## .gitignore
yeh file tab kam ati hai ager ham apna project github par push kr rahe hai to security k liye apis keys and database config file or env file , node modules etc koi github par push na krna ho to 


## jsx 
ham ager koi function ko return kr rahe hai to by default ek he result or output or value jo bhi bolo return hota hai.. 

```jsx

const Frontend = () => {
  return (
    <div>This is Frontend app code running now </div>
  )
}

export default Frontend
```

ager main return function mein ek or value add krun to error ayega   

```jsx 
const Frontend = () => {
  return (
    <div>This is Frontend app code running now </div>
    <div> this is another value </div> 
  )
}
// or yeh function mein error ayega 
export default Frontend
```
now ager muje ek sey data elements return krne hai to mein kaise krunga ? 
using the <> </> empty tags 

```jsx 

const Frontend = () => {
  return (
    <>
    <h1> This is multiple return values using empty tags</h1>
    <div>This is Frontend app code running now </div>
     </>

  )
}

export default Frontend

```

---

## task with react 
create file with first char upper case and use normal method to create function like this 

```jsx Testing.jsx

 function Testing(){
    return(
        <h1> This is tesing function </h1>
    )
 }

 export default Testing() 
```

or you can use the rfce snippit to auto file the basic structure of react arrow returning function

--> create this type of function files, and import into main.jsx or App.jsx do into both or understand the working ! also use the dev tools in your browser to check the output code or your index.html file ......

