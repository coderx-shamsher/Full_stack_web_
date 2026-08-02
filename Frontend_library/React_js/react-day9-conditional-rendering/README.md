# React Conditional Rendering 

**Conditional Rendering** ka simple matlab hai: **Condition ke hisaab se alag-alag UI dikhana.**

Jaise:
- Agar user **logged-in** hai → "Welcome, User" dikhao.
- Agar **logged-out** hai → "Login" button dikhao.

React me ye JavaScript logic (`if`, `&&`, `? :`) use karke hota hai. [react](https://react.dev/learn/conditional-rendering)

***

## 1. `if...else` Statement (JSX ke bahar)

React me hum **direct JSX ke andar `if...else` nahi likh sakte**. Isliye pehle logic lagate hain, phir result return karte hain.

**Use Case:** Jab logic thoda bada ho ya multiple lines ka ho.

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back, User!</h1>;
  } else {
    return <h1>Please login to continue.</h1>;
  }
}
```

**Simple Rule:** JSX (`return (...)`) ke upar likho, andar nahi. [w3schools](https://www.w3schools.com/react/react_conditional_rendering.asp)

***

## 2. Ternary Operator (`? :`) (JSX ke andar)

Ye sabse common aur clean tarika hai **chote if-else** ke liye.

**Syntax:** `condition ? (True wala part) : (False wala part)`

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, User!</h1>
      ) : (
        <h1>Please login.</h1>
      )}
    </div>
  );
}
```

**Kab use karein:** Jab sirf **do options** ho (True ya False). [react](https://react.dev/learn/conditional-rendering)

***

## 3. Logical AND (`&&`) Operator

Ye tab use hota hai jab humein **sirf kuch dikhana ho ya kuch nahi dikhana ho**. (Agar condition true hai to render karo, warna kuch mat karo).

**Example:** Loading state ya Error message.

```jsx
function Dashboard({ isLoading, data }) {
  return (
    <div>
      {/* Agar isLoading true hai, to message dikhao */}
      {isLoading && <p>Loading data...</p>}
      
      {/* Agar data hai, to list dikhao */}
      {data && <ul>{data.map(item => <li key={item.id}>{item.name}</li>)}</ul>}
    </div>
  );
}
```

**Logic:**
- `true && <Component />` → Component render hoga.
- `false && <Component />` → Kuch nahi render hoga. [w3schools](https://www.w3schools.com/react/react_conditional_rendering.asp)

***

## 4. Switch Statement (Multiple Conditions)

Jab ek variable ke basis par **bahut saare alag-alag results** dikhane ho.

**Example:** User Role ke hisaab alag menu.

```jsx
function UserMenu({ role }) {
  switch (role) {
    case "admin":
      return <button>Admin Panel</button>;
    case "user":
      return <button>User Profile</button>;
    case "guest":
      return <button>Login</button>;
    default:
      return <button>Unknown Role</button>;
  }
}
```

**Kab use karein:** Jab 2 se zyada options ho. [sitepoint](https://www.sitepoint.com/conditional-rendering-in-react/)

***

## 5. Nothing Return karna (`null`)

Kabhi-kabhi condition match na hone par **kuch bhi nahi dikhana** hota. Iske liye `null` return karte hain.

```jsx
function Warning({ showAlert }) {
  if (!showAlert) {
    return null; // Kuch render nahi hoga
  }
  return <div className="alert">Warning! Danger.</div>;
}
```

**Note:** `return null` ka matlab hai component exist karega, lekin screen par kuch nahi dikhega. [refine](https://refine.dev/blog/react-conditional-rendering/)

***

## 6. Common Mistakes (Falsy Values Trap)

React me `0`, `""` (empty string), aur `null` bhi **falsy** maane jate hain. Agar aap `&&` use karte ho aur value `0` hai, to wo render nahi hogi.

**Galat Code:**
```jsx
// Agar count 0 hai, to ye "0" screen par print kar dega (kyunki 0 falsy hai par render hota hai)
{count && <p>Count is {count}</p>} 
```

**Sahi Code (Ternary use karo):**
```jsx
{count > 0 ? <p>Count is {count}</p> : <p>No items</p>}
```

**Rule:** Agar value `0` ho sakti hai, to `&&` ki jagah Ternary (`? :`) use karo. [youtube](https://www.youtube.com/watch?v=lgtQwixg0R0)

***

## 7. Best Practices (Summary)

Interview aur production ke liye ye yaad rakho:

1. **Simple Logic:** JSX ke andar `if` mat likho, `ternary` ya `&&` use karo. [medium](https://medium.com/@aliciayu22/react-conditional-rendering-46e61a576cea)
2. **Readability:** Logic bahut lamba ho jaye to usko alag **function** ya **component** me daal do. [sitepoint](https://www.sitepoint.com/conditional-rendering-in-react/)
3. **Early Return:** Component ke start me hi `if (!data) return null;` likh kar code clean rakho. [dev](https://dev.to/tene/mastering-conditional-rendering-in-react-4980)
4. **Falsy Values:** `0` aur empty string ke saath `&&` use karne se bacho. [youtube](https://www.youtube.com/watch?v=lgtQwixg0R0)

***

**Quick Cheat Sheet:**
- **Do options?** → Ternary (`? :`) [react](https://react.dev/learn/conditional-rendering)
- **Sirf dikhana hai ya chupana hai?** → Logical AND (`&&`) [w3schools](https://www.w3schools.com/react/react_conditional_rendering.asp)
- **Bahut saare options?** → Switch / Object Map [sitepoint](https://www.sitepoint.com/conditional-rendering-in-react/)
- **Bada logic?** → `if...else` (JSX se bahar) [medium](https://medium.com/@aliciayu22/react-conditional-rendering-46e61a576cea)

Agar tum chaho, to main tumhe **ek complete mini-project** (jaise Login/Logout + Dashboard) bana ke de sakta hoon jisme ye saare concepts use honge.

--- 


# Conditional Rendering code with explainations

## using Ternary operator -> 
```jsx

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [count, setCount] = useState(0);
  const [btn, setbtn] = useState(false);
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        <section
          style={{
            backgroundColor: "lightgrey",
          }}
        >
          {/* 1 way to use conditional rendering ->  is to using the ternary operator in react  */}
          {btn ? <Card /> :
            <div style={{ margin: "8rem" }}>
              <h2 style={{ color: "lightsalmon" }}>card is not showed </h2>
            </div>
          }

          {/* button click logic ->  */}
          <button
            onClick={() => {
              setbtn(!btn); // hamne use kiya hai ! (not operator), true hai to false hoga false hai to true
            }}
          >
            show card{" "}
          </button>
        </section>
      </section>
    </>
  );
}

export default App;
```

- hamne ternary operator ka use kra yeh less code k liye hai ager hamein *if else use krna hai to* ?? 

## using if else 
- component jo render hoga uska code -->
```jsx
import React from "react";

const Test_render = () => {
  return (
    <div style={{
        margin : "50px"
    }}>
      <section
        style={{
          width: "30rem",
          height: "20rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px", 
          backgroundColor : "lightskyblue",
          color: "Background",
          borderRadius : "40px",
          flexDirection : 'column'
        }}
      >
        <div>
          <p>Testing rendering </p>
        </div>
        <div>
          <p>using the if else conditional </p>
        </div>
        <div>
          <p>is this is best way to rendering !</p>
        </div>
      </section>
    </div>
  );
};

export default Test_render;


```

- app jsx code here -> 
```jsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from "./components/Card";
import Test_render from "./components/Test_render";

function App() {
  // const [count, setCount] = useState(0);
  const [btn, setbtn] = useState(false);

  // show function / rendering function

  function show() {
    if (btn === false) {
      return (
        <div
          style={{
            width: "20rem",
            height: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "5rem",
            marginTop: "5rem",
            borderRadius: "40px",
            backgroundColor: "lightgoldenrodyellow",
            color: "black",
            fontSize: "20px",
          }}
        >
          <p>Ui is not founded.....</p>
        </div>
      );
    } else {
      return <Test_render />;
    }
  }

  // 1) pahle jo logic hame jsx k bahar likhna hota hai or bad mein hame result koi return krna hai keoki ham jsx mein if else use nhi kr sakte..! 

  return (
    <>
      <section
        style={{
          paddingTop: "10px",
        }}
      >
        <button
          style={{
            padding: "20px",
            borderRadius: "20px",
          }}
          onClick={() => {
            setbtn(!btn);
          }}
        >
          click to render
        </button>

        {
           show()  // calling the function of rendering something here 
        }  
      </section>
    </>
  );
}

export default App;
```

*try and code, fir he yeh clear hota hai concept....*
*mostly ham ternary syntax ka he use krte hain ager logic long yan complex nhi hai*

--- 

## User Greeting code -->>
- checkuser component code here 
```jsx


import '../styles/styles.css'
const Usercheck = (user) => {


  let loginusers = ["admin", "user", "coderx", "root"];

  // console.log(user in loginusers);

  if (user === loginusers[0]) {
    return (
      <div className="usergreetcard">
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
      </div>
    );
  }
  if (user === loginusers[1]) {
    return (
      <div className="usergreetcard">
        <>
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
        </>
      </div>
    );
  }
  if (user === loginusers[2]) {
    return (
      <div className="usergreetcard">
        <>
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
        </>
      </div>
    );
  }
  if (user === loginusers[3]) {
    return (
      <div className="usergreetcard">
        <>
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
        </>
      </div>
    );
  } else {
    return (
      <div className="usergreetcard">
        <>
          <p className="text_wrong_user"> Something is wrong !!</p>
          <p className="text_wrong_user">User = {user} </p>
        </>
      </div>
    );
  }
};

export default Usercheck;

```

- style css

```css
.usergreetcard{
    width: 30rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items:  center;
    background-color: lightgray; 
    color: black;
    margin-top: 20px;  
    margin-left: 100px ;
    gap: 10px;
}

.text {
    font-size: large;
    font-family: 'Times New Roman', Times, serif;
}
.text_wrong_user{
    color: lightcoral;
    font-size: 25px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
```
--- 

- App jsx logic code 

```jsx
import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Test_render from "./components/Test_render";
import Usercheck from "./components/Usercheck";

function App() {
  const [user, setuser] = useState([]);

  function userinput() {
    let user = prompt("enter your username");
    return user;
  }

  return (
    <>
      <div
        style={{
          paddingTop: "20px",
          marginBottom: "40px",
        }}
      >
        <button
          onClick={() => {
            let user = userinput();
            setuser(user);
          }}
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "lightsteelblue",
            color: "yellow",
            fontSize: "20px",
          }}
        >
          check user !
        </button>
      </div>

      {Usercheck(user)} 
      {/* rendering the function jismein hamne logic likha hai k kiya render hoga  */}
    </>
  );
}

export default App;

```
--- 

*try and test your self....*