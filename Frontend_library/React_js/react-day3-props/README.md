# React Props Drilling concept with components 

```sh

npm create vite@latest 


## change directory 
cd yourFolder

npm install --ignore-scripts && npm clean-install 

npm run dev  # to start the app serve 

```
---

## setup tailwindcss for vite 
```sh
npm install tailwindcss @tailwindcss/vite

```
## add tailwindcs into vite config 
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()

  ],
})
```
## now import tailwindcss into index.css link into index.html
```css
@import "tailwindcss"

```

```html
   <link rel="stylesheet" href="/src/index.css">
```
- now use tailwindcss in your project 


## make components folder and create card components

```jsx
// import React from 'react'

const Card = () => {
  return (
    <>
      <div className="usercard border border-sky-500 w-[30rem] h[20rem] ml-[10rem] pl-[30px] p-4">
            <h2 className="font-bold">Coderx</h2>  
             <p className="">this is the coderx 👋🏞️</p>
             <p className=""><i>coderx0b0110@gmail.com</i></p>
      </div>
    </>
  )
}

export default Card
```

---
- add this component into your app.jsx 

## vairable syntax in jsx 
ham jaise js mein variables create krte hain jsx mein bhi vese he declare krte hain... bs call krne or use krne k liye ham {} ka use krte hain lets see how its works.. 

```jsx 
import Card from "../components/Card"

//  maine ek variable banya 
let user = "shamsher" 

const App = () => {
  return (
    <>
      <Card/>
      <br />
    
      <h2>Hi this is user</h2> 
        {/* ager direct varible name pass krte ho to vo as a string he count hoga in jsx so how to do properly..*/}
     
     <h2>Hi this is testing</h2>

     <h2>Hi this is {user}</h2>     {/* this is the proper way to print variable values in react(jsx)  , ager variable ki value change hogi to mere h2 mein bhi value update hogi... */}
    
    {/* now ager main "testing" ki jagah par mera user variable show/print krvana chahta hun to mai ! variable ka name pas krte hun 
     
       
    */}
    
      {/* or ham components koi bhi {} mein print yan use kr sakte hain   */}
        {Card()}   
      {/* this is how to use component in function calling way old way , at the end components bhi functions hain  */}
    </>
  )
}

export default App
 

```

---
## updated App/card styles -->
- App jsx 
```jsx
import Card from "../components/Card"

const App = () => {
  return (
    <> 
     <section className="flex items-center justify-center flex-col">
      <Card/>
      <Card/>
      <Card/> 
     </section>
    
    </>
  )
}

export default App
```
- Card jsx 
```jsx 
const Card = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col flex-wrap border border-black w-[30rem] h[20rem] ml-[10rem] pl-[30px] p-6 relative gap-2 bg-zinc-200">
        <img className="w-[100px] rounded-3xl  absolute left-[20px]" src="../public/images/miyamoto.png" alt="" />
            <h2 className="font-bold">Coderx</h2>  
             <p className="">this is the coderx 👋🏞️</p>
             <p className=""><i>coderx0b0110@gmail.com</i></p>
      </div>
    </>
  )
}

export default Card

```

---

## props Driling 
- yeh ek concept hai jisme main data set krte hain project mein jitne bhi components hain, Note: props hamesa up to down flow krte hain mein parent to childs or yahan ham App.jsx say he props ko send krte hain 
           
           App         ------           components 
        (parent)      -------------       (child)

sara data appjsx say he components tak flow hota hai... 
now how to use props in react ---> 

### app jsx sending props values 
- App jsx 
```jsx 
    <section className="flex items-center justify-center flex-col gap-3.5">
    {/*  so ham jaise html main attributes use krte hain, props bhi same he syntax say create krna hai or  pass krne hai  

     // for string value 
      props_name = "value"

    ager numbers koi pass krna hai to use this {] 

     // for number value 
      props_number = {100}


    */}

      <Card Users="Coderx" email="coderx001001" age={21}/>
      
     </section>

```

- Card jsx , get your props 

```jsx 

// hamne card funcion main props name ka ek parameter pass kiya jis ki help say ham hamare props value koi get kr sakte hain Note: props ek object hai.  parameter ka name kuch bhi ho sakta hai..

const Card = (props) => {
  console.log(props);

  return (
    <>
      <div className="flex items-center justify-center flex-col border border-black w-[29rem] h[20vh]  pt-5 pl-5 pb-5 relative gap-2 bg-zinc-200 rounded-4xl">

        <img className="w-[100px] rounded-3xl  absolute left-[20px]" src="../public/images/miyamoto.png" alt="" />
            <h2 className="font-bold">{props.user}</h2>  
             <p className="">This is The <strong>{props.user}👋🏞️</strong></p>
             <p className=""><i> <strong> {props.email}</strong> @gmail.com</i></p>
             <p> <strong>Age  :  </strong> 
                 <em>
                  {props.age}
                 </em>
              </p>   
      </div>
    </>
  )
}

export default Card

```
--- 

- now app mein card component koi resuse kro our props value koi change kro tn ki diff user with email age etc print ho app card mein... 

```jsx 


      <Card user="CoderX" email="coderx001001" age={21}/>
      <Card user="CoderZ" email="coderz002002" age={21}/>
      <Card user="CoderY" email="codery0103" age={21}/>

```

--- 

## NOTE -> checkout the Visual infographics folder for better notes 


