# React Context api

1. create context
2. provide context
3. use context

- Create folder contexapi -> Create file context.jsx

#### cover app with contextapi file

```jsx
createRoot(document.getElementById("root")).render(
  //  cover the app with your context file
  <Context>
    <App />
  </Context>,
);
```

- now createcontext in context file

```jsx
import React, { createContext } from "react";

const Context = (props) => {
  // show props
  console.log(props);

  createContext(Context);
  return <div>{props.children}</div>;
};

export default Context;
```

> Create  context into you context api file 
```jsx 
import { createContext } from "react";

// maine createContext() hook mein mere contextapi file pass kra or uski help se maine ek Globaldata name ka ek context create kra hai jo ki ek Global context hai ab use koi bhi use kr sakta hai  
// 1) create kr liya context koi usin the createcontext() 

export  let GlobalData =  createContext();


const Context = (props) => {
  console.log(props); 
  return (
  <div>
    {/* 2 context.provider ki hamse hame provide krna hai use or data ese mein declare krna hai */}
       <GlobalData.Provider value={["hello", "context_api"]} >
            {props.children}
       </GlobalData.Provider>

  </div>
)};

export default Context;

```

- Now hamne create kr liye provide kr liya ab usse use krna hai to main use mere ek Testing.jsx component mein use krne vala hun.. or make sure k vo app component mein added ho jis component main use hame context data ko use krna hai... 



