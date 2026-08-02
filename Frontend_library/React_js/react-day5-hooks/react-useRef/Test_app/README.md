# React useRef

**`useRef` Hook** React ka ek aisa tool hai jo aapko **mutable values ko render ke bina bhi persist** karne deta hai, aur **DOM elements ko directly access** karne ke liye use hota hai. Ye `useState` jaisa hai, lekin `current` property change karne par **re-render trigger nahi hota**. [react](https://react.dev/reference/react/useRef)

---

## 1. `useRef` kya hai? (Simple Hinglish)

**Definition:** `useRef` ek React Hook hai jo aapko ek **mutable ref object** return karta hai. Is object me ek **`.current`** property hoti hai jo aapke diye gaye initial value se set hoti hai.

**Key Feature:** Jab aap `.current` value change karte ho, tab **component re-render nahi hota**. Ye value **component ke lifecycle ke dauran persist** karti hai, even after re-renders. [hygraph](https://hygraph.com/blog/react-useref-a-complete-guide)

---

## 2. `useRef` ke Do Main Use Cases

### Case 1: DOM Elements ko Directly Access karna

React normally **Virtual DOM** use karta hai, lekin kabhi-kabhi aapko **real DOM element** (jaise `<input>`, `<video>`, `<canvas>`) par directly action lena hota hai.

**Example:** Input field par focus karna jab page load ho.

```jsx
import { useRef, useEffect } from "react";

export default function FocusInput() {
  const inputRef = useRef(null); // 1. Ref create kiya

  useEffect(() => {
    // 2. Component mount hone par focus karo
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Focus on Input</h1>
      {/* 3. Ref ko input element se attach kiya */}
      <input type="text" ref={inputRef} placeholder="Type here..." />
    </div>
  );
}
```

**Flow:**

1. `useRef(null)` → ek box bana diya jisme `current` property hai.
2. `<input ref={inputRef}>` → ab ye box input element ko reference kar raha hai.
3. `inputRef.current` → ab aap input par JavaScript methods (jaise `.focus()`) use kar sakte ho. [w3schools](https://www.w3schools.com/react/react_useref.asp)

---

### Case 2: Values ko Persist karna bina Re-render ke

Kabhi-kabhi aapko koi value store karni hoti hai jo **UI update nahi karegi**, lekin next render me chahiye hogi.

**Example:** Click count track karna, lekin UI par sirf message dikhana.

```jsx
import { useRef, useState } from "react";

export default function ClickTracker() {
  const countRef = useRef(0); // Mutable value (No Re-render)
  const [message, setMessage] = useState("");

  const handleClick = () => {
    countRef.current += 1; // 1. Value update, no re-render
    setMessage(`Clicked ${countRef.current} times`);
  };

  return (
    <div>
      <h2>Click Counter</h2>
      <p>{message}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

**Why useRef?**
Agar aap `useState` use karte, to har click par component re-render hota. Yahan `countRef` sirf logic ke liye hai, UI ke liye nahi. [hygraph](https://hygraph.com/blog/react-useref-a-complete-guide)

---

## 3. `useRef` vs `useState` (Kab kaunsa use karein?)

| Feature       | `useRef`                                     | `useState`                                          |
| ------------- | -------------------------------------------- | --------------------------------------------------- |
| **Re-render** | Nahi hota (Silent Update)                    | Hoti hai (Visible Update)                           |
| **Use Case**  | DOM Access, Timers, Tracking Previous Values | UI Updates (Data change dikhe)                      |
| **Syntax**    | `const myRef = useRef(initialValue);`        | `const [state, setState] = useState(initialValue);` |
| **Access**    | `myRef.current`                              | `state`                                             |

**Rule:**

- Agar value change hone par **UI change hona chahiye** → `useState`.
- Agar value change hone par **UI change nahi hona chahiye** → `useRef`. [hygraph](https://hygraph.com/blog/react-useref-a-complete-guide)

---

## 4. Real-World Examples (Hinglish me)

### A. Timer ko Stop/Reset karna

`useRef` ka sabse common use **Timer ID** store karna hai taaki hum use clear kar sakein.

```jsx
import { useRef, useEffect, useState } from "react";

export default function Timer() {
  const timerRef = useRef(null); // Timer ID store karne ke liye
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current); // Ref se ID access karke timer roka
  };

  useEffect(() => {
    // Component unmount hone par timer clear karo
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <h1>Time: {seconds}s</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

**Logic:** `useRef` ne `setInterval` ki ID store ki. Jab humne stop click kiya, to `clearInterval` se timer band kar diya. [medium](https://medium.com/@freshyblog07/react-useref-hook-example-beginners-guide-with-practical-use-cases-27d18a0fbcf6)

---

### B. Previous Value Track karna

Agar aapko pichla state yaad rakhna hai, to `useRef` perfect hai.

```jsx
import { useState, useRef, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0); // Pichla value store karne ke liye

  useEffect(() => {
    prevCountRef.current = count; // Har render ke baad update
  });

  return (
    <div>
      <h1>Current: {count}</h1>
      <h1>Previous: {prevCountRef.current}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

**Note:** `useEffect` me `prevCountRef.current = count` karke humne **current value** ko next render ke liye **previous value** bana diya. [medium](https://medium.com/@freshyblog07/react-useref-hook-example-beginners-guide-with-practical-use-cases-27d18a0fbcf6)

---

## 5. `useRef` Kitna Aana Chahiye? (Checklist)

Interview aur production ke liye ye 5 points master kar lo:

1. [ ] **DOM Manipulation:** Input focus, scroll position, video play/pause. [w3schools](https://www.w3schools.com/react/react_useref.asp)
2. [ ] **No Re-render:** Values store karna bina UI update ke. [hygraph](https://hygraph.com/blog/react-useref-a-complete-guide)
3. [ ] **Timers/Intervals:** `setInterval` ya `setTimeout` ki ID store karna. [medium](https://medium.com/@freshyblog07/react-useref-hook-example-beginners-guide-with-practical-use-cases-27d18a0fbcf6)
4. [ ] **Previous Value:** State ka purana value track karna. [medium](https://medium.com/@freshyblog07/react-useref-hook-example-beginners-guide-with-practical-use-cases-27d18a0fbcf6)
5. [ ] **Syntax:** `ref={myRef}` aur `myRef.current` ka sahi use. [w3schools](https://www.w3schools.com/react/react_useref.asp)

---

**Summary:**

- `useRef` ek **mutable box** hai jo **re-render ke bina survive** karta hai.
- Iska use **DOM access** aur **logic ke liye values store** karne ke liye hota hai.
- Agar **UI change** karna hai, to `useState` use karo. Agar **chupchap se data** chahiye, to `useRef` use karo. [hygraph](https://hygraph.com/blog/react-useref-a-complete-guide)

---

## useRef understanding ---->

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

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  );
}

export default App;
```

- jab bhi count change hota hai component re-render hota hai yeh ham useEffect ka use kr k dekhte hain

```jsx
// add this into you app component

useEffect(() => {
  console.log("Re-rending.......");
});
```

- Now checkout the the terminal

**ager ham ek vairable create krte hain or uski value koi useEffect k ander console kren to jaise ham count ko increment kr rahe hain.. to kiya yeh work krega..**

```jsx
let test_num = 1;

useEffect(() => {
  test_num + 1;
  console.log(`Re-rending.......  ${test_num}`);
});
```

> ham essa karte hain to hamari value increament nhi hoti keoki har re-render par value refresh ho rahi hai

**to hame ager es normal variable ko use krna hai, aur uski value jaise ham state change kre to uski value bhi change ho here is useRef**

```jsx
// let test_num = 1

// set initlial value with useRef()
let num = useRef(0);

useEffect(() => {
  // test_num + 1;
  // console.log(`Re-rending.......  ${test_num}`)

  // now hame .current ki help se values ko get krte hain
  //console.log(num.current);   // jaise he count par click krne par state change hoti hai to hame 0 print hota milta hai
  //console.log(num);           // hame ek object mil rahi hai

  num.current = num.current + 1;
  console.log(`Re-rending.......  ${num.current}`); // now jaise he ham state change kr rahein hai value bhi increament ho rahi hai  num ki ...
});
```

> NOTE :- normal vairable initialize krne k bad jab hamne use kiya to jab bhi state change hoti to component re-render hota hai to hamare vairable ki value dubara initial value set ho jati hai eska solution hai useRef hook.
> \*\*yeh kiya krta hai k ager hamne eski help ki koi vairable yan value initialze krdi to vo re-render par refresh nhi hoti re-initialze nhi hoti jo ki hamne code mein dekha jase he hamne useref ko use kra to hamri value state change krne par fir se refesh nhi huyi jo inceament hoti gyi jase he count koi increament kiya

---

## DOM Manipluation using the useRef

1. install react-router-dom

```sh

npm install react-route-dom

```

2.  create a route
    pages/ folder create kro and file create kro jo bhi name ka route create krna hai

- mere test.jsx file in pages/

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test_ref from "../components/Test_ref";

const Test = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/test" element={<Test_ref />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Test;
```

> make sure k pages/test.jsx file ko app k ander add krna nhi to route par koi ui show nhi hoga

- app.jsx

```jsx
<Test />
```

- testref.jsx file jiska code hame /test route par show hoga

```jsx
import { useRef, useEffect } from "react";
const Test_ref = () => {
  // --> this the second use case of useRef ( dom manipluation using the useRef )

  // 1) ref create krna hai element ka
  const h2Ref = useRef();

  // useEffect
  useEffect(() => {
    // 2) hamne dom manipulation kiya
    h2Ref.current.style.color = "lightblue";
  });

  return (
    <div>
      {/* add kiya ref  */}
      <h2 ref={h2Ref}>this is testing heading .</h2>
      <p>Useradmin</p>
      <p>test12x0@gmail.com</p>
    </div>
  );
};

export default Test_ref;
```

*ager /test par ja k dekhoge ki hamare h2 ka color change ho gya hai* 

- more examples -> 

```jsx
import {useRef, useEffect} from 'react'
const Test_ref = () => {
  
  // --> this the second use case of useRef ( dom manipluation using the useRef ) 
  
  // 1) ref create krna hai element ka 
  const h2Ref = useRef() 
  
  const gmailRef = useRef()
  
  // useEffect 
  useEffect(()=>{
    // 2) hamne dom manipulation kiya 
    h2Ref.current.style.color = "lightblue"
  })

    return (
    <div style={{
        marginBottom : '10rem'
    }}>
        
        {/* 3) add kiya ref  */}
         <h2 ref={h2Ref}>this is testing heading .</h2>
         <p>Useradmin</p>
         <p ref={gmailRef}>test12x0@gmail.com</p>
       
       <div> 
           <p>tap to change the color or gmail</p>
            <button onClick={()=>{
                 gmailRef.current.style.color = "lightpink"
            }}>change color</button>
       </div>
    </div>
  )
}

export default Test_ref

```

--- 

> *Make sure k ager hame kisi value ko update krna hai jaise count ki value update ho rahi hai to ham useRef ka istemal nhi krenge keoki jab hamm esa krete hain to state change useRef value koi persist krta hai means value change nhi hogi or same he show krga jo hamne set kiya hai ager increament krte bhi to bhi keoki state change nhi hogi or component rerender nhi hoga or value ui par update nhi hogi... **bs hamein ui mein value update kr kshow krni hai to usestate!***

---
