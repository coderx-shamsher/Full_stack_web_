#  <<<<<<<React Day 2>>>>>>>
## Concept --->>   Components <<---


- ager tumne react app create kr lyi hai using vite to next step is change the directory 

```bash 

cd  react-project-foldername

## you need  to install node modules 

npm install --ignore-script && npm clean-install

```

# start the react server 
```bash

npm run dev 

```

--- 

## Components  -----> 
## Component kya hota hai

Component ek **reusable UI block** hota hai. Simple words me, yeh aisa function ya unit hota hai jo screen ka ek part banata hai, jaise button, navbar, card, form, sidebar, ya complete page section.

React me mostly **functional components** use hote hain. Ye JavaScript functions hote hain jo props lete hain aur JSX return karte hain; class components purane codebases me mil sakte hain, but modern React me function components standard hain.

- Note ham ek components name ka folder create krte hain /src mein jismein hamare components hote hain...

>  mein ek file (component) create krri first char upper case navbar component 
First component 
```jsx
const Navbar = () => {
  return (
    <>
       <header>
             <ul>
                  <a href="#">
                      <li>Home</li>
                  </a>
                  <a href="#">
                      <li>About</li>
                  </a>
                  <a href="#">
                      <li>Contact us</li>
                  </a>
                  <a href="#">
                      <li>login/sign-up</li>
                  </a>
             </ul>
       </header>
    </>
  )
}

export default Navbar

```

## For styling lets setup tailwindcss with vite 
```bash

## first command 
npm install tailwindcss @tailwindcss/vite

```
- import tailwindcs into your vite config 

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

- create a css file or if you have app.css than import tailwindcss like this 

```css

@import "tailwindcss"

```
- last step add your your i mean this file , jismein @import tailwindcss kra hai use index.html mein link kro or use kro sare he project mein tailwindcss

```html

  <link rel="stylesheet" href="./src/App.css">

```

- enjoy tailwindcss 🚀💕

- modified Navbar component code 

```jsx


const Navbar = () => {
  return (
    <>
       <header className=" bg-sky-600 text-amber-100  ">
             <ul className="flex justify-end gap-6.5 h-10 items-center mr-5.5">
                  <a href="#">
                      <li>Home</li>
                  </a>
                  <a href="#">
                      <li>About</li>
                  </a>
                  <a href="#">
                      <li>Contact us</li>
                  </a>
                  <a href="#">
                      <li>login/sign-up</li>
                  </a>
             </ul>
       </header>
    </>
  )
}

export default Navbar

```

--- 


# react components , component based architechture ? 

React components aur **component-based architecture** React ka sabse important concept hai. Job ke liye bhi ye topic top priority me aata hai, kyunki companies expect karti hain ke tum UI ko chhote, reusable, manageable pieces me soch sako.

## Component kya hota hai

Component ek **reusable UI block** hota hai. Simple words me, yeh aisa function ya unit hota hai jo screen ka ek part banata hai, jaise button, navbar, card, form, sidebar, ya complete page section.

React me mostly **functional components** use hote hain. Ye JavaScript functions hote hain jo props lete hain aur JSX return karte hain; class components purane codebases me mil sakte hain, but modern React me function components standard hain.

## Component-based architecture kya hai

Component-based architecture ka matlab hai poori app ko chhoti-chhoti independent parts me todna. Har part apna kaam karta hai, aur phir ye parts milkar complete UI banate hain.[^2][^8][^6]

Misal ke taur par:

- `Header`
- `Sidebar`
- `ProductCard`
- `SearchBar`
- `Footer`

Ye sab alag components ho sakte hain. Inko alag file me rakhne se code clean rehta hai, reuse hota hai, aur maintenance easy hoti hai.

--- 
## Tumhe kya master karna chahiye

React component topic me ye cheezein solid honi chahiye:

- Functional components ka syntax.
- JSX return karna.
- Props se data pass karna.
- Component reuse karna.
- Parent-child component relationship.
- Small components ko combine karke bigger UI banana.

---

## Short Summary Line -->>
**“React components reusable UI building blocks hote hain. Component-based architecture me app ko small, independent, reusable parts me divide kiya jata hai, jisse code maintainable, scalable, aur easy to debug ho jata hai.”**

