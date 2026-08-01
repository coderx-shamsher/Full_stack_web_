# React Project setup 

```sh

  npm create vite@latest 
 
 npm install --ignore-scripts && npm clean-install

 mkdir ./src/components

  touch ./src/components/Navbar.jsx

   mkdir ./src/Context

   touch ./src/Context/Theme_Context.jsx

```

> setup context api with main.jsx (hame main.jsx mein,  apni app component koi wrap kro with your context api )

```jsx
import Theme_Context from "./Context/Theme_Context.jsx";

createRoot(document.getElementById("root")).render(
  <Theme_Context>
    <App />
  </Theme_Context>,
);

```

> context api setup into Theme_Context.jsx 
```jsx 

```


