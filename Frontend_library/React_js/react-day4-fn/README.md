# react app setup 

```sh
npm create vite 

## then this 
npm init -y && npm install --ignore-scripts && npm clean-install

```


##  functions in react 

In React, a **function** usually means a **function component**: a normal JavaScript function that returns UI markup. React apps are built from components, and a component can be as small as a button or as large as a whole page. [react](https://react.dev/learn)

## Simple example

```jsx
function Hello() {
  return <h1>Hello world</h1>;
}
```

You can also write it as an arrow function:

```jsx
const Hello = () => {
  return <h1>Hello world</h1>;
};
```

Both are valid React function components. [geeksforgeeks](https://www.geeksforgeeks.org/reactjs/reactjs-functional-components/)

## What it does

A React function:

- takes inputs called **props**.
- returns JSX.
- can use **hooks** like `useState` and `useEffect` to manage state and side effects. [robinwieruch](https://www.robinwieruch.de/react-function-component/)

Example with props:

```jsx
function UserCard({ name }) {
  return <p>Hello, {name}</p>;
}
```

## Why React uses functions

Functions make components easier to:

- reuse.
- test.
- understand.
- compose into larger UIs. [blog.logrocket](https://blog.logrocket.com/fundamentals-functional-programming-react/)

## Very short rule

If someone says “function in React,” they usually mean a **function component** that returns JSX and builds the UI. 
If you want, I can next explain:
1. function component vs normal JS function,  
2. props inside functions, or  
3. hooks inside function components.

React event listeners ka simple matlab hai: **user jo bhi action kare—click, type, submit, hover, key press—uske response me code chalana**. React me ye `addEventListener()` ki jagah mostly JSX props ke through handle hota hai, like `onClick`, `onChange`, `onSubmit`. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
## React events ka basic idea
Vanilla JavaScript me tum event listener aise lagate ho:

```js
button.addEventListener("click", () => {
  console.log("clicked");
});
```

React me same kaam aise hota hai:

```jsx
<button onClick={() => console.log("clicked")}>Click me</button>
```

React me events inline JSX me attach hote hain, aur naming camelCase me hoti hai: `onClick`, `onChange`, `onSubmit`. [medium](https://medium.com/nerd-for-tech/some-about-react-event-listeners-cdd612c64129)
## Modern frontend me kaun-kaun se events common hote hain
Modern websites me sabse zyada ye event handlers use hote hain: `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onFocus`, `onBlur`, `onMouseEnter`, `onMouseLeave`, aur kabhi-kabhi `onScroll`, `onDragStart`, `onDrop`. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)

Real world me sabse important teen events ye hote hain:
- `onClick` for buttons, cards, menu items.
- `onChange` for inputs, selects, textareas.
- `onSubmit` for forms. [dev](https://dev.to/jbigishiro/mastering-event-listeners-in-react-2jp2)
## `onClick` example
```jsx
function Counter() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

Best practice ye hai ki function ko reference ki tarah pass karo, directly call mat karo. `[onClick={handleClick}]` sahi hai, `[onClick={handleClick()}]` galat hai because wo render ke waqt hi run ho jayega. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
## `onChange` example
```jsx
function NameInput() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return <input type="text" onChange={handleChange} />;
}
```

`onChange` input ke value change hone par chalta hai, isliye forms aur controlled components me ye core event hai. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
## `onSubmit` example
```jsx
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" />
      <button type="submit">Login</button>
    </form>
  );
}
```

Form submit me `e.preventDefault()` almost always lagta hai, warna page reload ho sakta hai. `onSubmit` hamesha form tag par lagta hai, button par nahi. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
## React me event object
React event handler ko usually event object milta hai:

```jsx
const handleClick = (e) => {
  console.log(e);
};
```

Is object me target element, value, keyboard key, mouse coordinates jaise data milte hain. React internally synthetic event system use karta hai, isliye event handling predictable hoti hai. [medium](https://medium.com/nerd-for-tech/some-about-react-event-listeners-cdd612c64129)
## Keyboard and focus events
These are very important in modern UI:

```jsx
function SearchBox() {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Search");
    }
  };

  return <input onKeyDown={handleKeyDown} />;
}
```

`onFocus` aur `onBlur` form validation, dropdowns, tooltips, and accessibility me kaam aate hain. `onKeyDown` keyboard interactions ke liye important hai. [dev](https://dev.to/jbigishiro/mastering-event-listeners-in-react-2jp2)
## React me normal `addEventListener` kab use hota hai
React JSX events ke alawa kabhi-kabhi `window.addEventListener` bhi use hota hai, especially:
- global keyboard shortcuts,
- resize detection,
- scroll listeners,
- click outside detection. [pluralsight](https://www.pluralsight.com/resources/blog/guides/event-listeners-in-react-components)

Example:

```jsx
import { useEffect } from "react";

function Example() {
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>Resize the window</div>;
}
```

Ye cases me cleanup zaroori hota hai, isliye `useEffect` ke cleanup function me listener remove kiya jata hai. [pluralsight](https://www.pluralsight.com/resources/blog/guides/event-listeners-in-react-components)
## How many event listeners are used in modern codebases
Exact number fix nahi hota, but modern frontend codebases me usually **5 to 10 core event types** baar-baar use hote hain, aur baaki events feature ke hisaab se add hote hain. Most apps ka daily work `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onFocus`, `onBlur`, and occasional window-level listeners par depend karta hai. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
## What matters most to master
Agar tum React events master karna chahte ho, to ye 6 cheezein strong honi chahiye:
- `onClick`, `onChange`, `onSubmit` ka proper use. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
- Event handler function ko directly pass karna, call nahi karna. [dev](https://dev.to/codingkaur/events-in-react-simplified-2a2)
- `e.preventDefault()` kab use hota hai. [dev](https://dev.to/jbigishiro/mastering-event-listeners-in-react-2jp2)
- Controlled inputs ka flow. [dev](https://dev.to/jbigishiro/mastering-event-listeners-in-react-2jp2)
- Keyboard and focus events. [dev](https://dev.to/jbigishiro/mastering-event-listeners-in-react-2jp2)
- `useEffect` ke saath global listeners aur cleanup. [pluralsight](https://www.pluralsight.com/resources/blog/guides/event-listeners-in-react-components)
## Easy practice code
### 1. Button click
```jsx
function App() {
  return <button onClick={() => alert("Clicked!")}>Click me</button>;
}
```
### 2. Input change
```jsx
function App() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return <input onChange={handleChange} />;
}
```
### 3. Form submit
```jsx
function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Send</button>
    </form>
  );
}
```
## Short rule to remember
React me **UI events mostly JSX props se handle karo**, aur **window/document level events only tab use karo jab zarurat ho**. Modern codebases me event handling ka goal hota hai: clean handler, clear state update, proper cleanup, and no unnecessary complexity. [medium](https://medium.com/nerd-for-tech/some-about-react-event-listeners-cdd612c64129)

Agar chaho, next message me main tumhe **React events ka complete interview-style cheat sheet** de sakta hoon with `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onFocus`, `onBlur`, `onMouseEnter`, `onScroll` — sab ka one-line use case aur examples.

```js 


// 1) mere pass ek h2 hai jis mein ek username hai 

// 2) main chaahta hun ki ek button k click par mere username change ho jye yan fir console par print ho btn is clicked how to do this 

// i) muje mere button select krna pardega keoki button k click par change hona chaahie 

// select your element 
let a = document.querySelector("button")

// a.addEventListener("click",function (){
//     console.log("button is clicked") 
// })

// or main esa bhi kr skata hun k ek or function pass kru just like that 

function changeuser(){
    console.log("button is click")
}

// now keoki function global mein create kiya hai to ham eventlistener main calll nhi krna esa keo ! keoki ager ham esa krte hain to function pahle he chalgyega button k click hone se pahle he isliye ager eventlistener mein function pass krna hai to uska name he pass krte hain. 
a.addEventListener("click",changeuser)

```

- to jsx mein kaise hota hota hai ?? 

```jsx 
import React from 'react'

const App = () => {

  function changeuser(){
     console.log('button is clicked');
  }

  return (
    <>
       
       <div className="main">
          
          <h2>hello its react functions</h2>


{/* using the onclick={} hame event listener ko use kr skate hain k click par ki action parformed ho */}
          <button onClick={changeuser}>change user</button>

       </div>
    
    </>
  )
}

export default App
```