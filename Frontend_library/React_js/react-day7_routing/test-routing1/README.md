# React Router DOM 
> *React Router DOM is the standard external library used to implement client-side routing and handle dynamic view updates in React web applications. It enables Single-Page Applications (SPAs) to update the browser URL and UI simultaneously without requesting an entire page refresh from the server*

- check out the offical react router dom website for better reff 
-  https://reactrouter.com/api/declarative-routers/BrowserRouter


## Who to setup and use react router step by step -->
1) install the package 
```sh

npm i react-router-dom

## eske sath kuch securty errors aa rahe hain pta nhi keo 
# added 2 packages, changed 1 package, and audited 142 packages in 3s
# 32 packages are looking for funding
#   run `npm fund` for details
# 2 high severity vulnerabilities
# To address all issues, run:
#   npm audit fix
# Run `npm audit` for details.


```

---

2) setup you app for react router 
```jsx 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </StrictMode>,
)

// import and use this BrowserRouter and uske ander wrap krdu app component ko 
```
- NOTE - ager main jsx mein app ko wrap nhi krna to app ager appjsx mein jis jagah code likh rhein hai router ka us code koi wrap krdu bs 

3) create pages folder inside the src and usmein apne route pages create kro jaise components create krte ho create -> home.jsx, about, and jo bhi route create krna hai usse pages folder main create kro, yeh components he hai but now these are the routes , har page k liye ek alag route file just like that bs itna he 

- NOTE -> react router se ham single page application create krte hain..

4) create routes in app 
```jsx 
import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
// hame route and routes koi import kna hota hai 
// routes component k ander ham route ka use krte hain means routes k ander route ko wrap kr k use krna hai let cook 
const App = () => {
  return (
    <>
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
      </Routes>
    </>
  )
}

export default App
```
- **Routers k ander ham ek ek kr k route set krte hain route path='/home' element='konsa element jo jsx files create kri hai like about, home whatever etc un component koi yahan call krn hai yan add krna hai' it like kone path par kona component render krna hai**

--- 

- now go to localhost url and type /about, /contact etc jo jo routers create kre hai or dekho jo us route se related component mein code hai vo vo code render hoga.. try ..... nowwww 

> now make Navbar component create kro jismein navigations links create krna hai jo / , /about /contact etc par navigate krne mein help kre keoki hamne react routing ki hai to ham a tag mein bs routes ka path add krna hai or kam ho gya ek basic navbar jo ki paths par jane mein help krta hain 


```jsx 
import React from 'react'

const Navbar = () => {
  return (
    <>
       <header style={{
        width : "full",
        height   : "10rem",
        backgroundColor  : "slateblue"
       }}>
           <ul style={{
             display : "flex",
             justifyContent : "end", listStyle : "none", gap : "30px", 
           }}>
               <li><a href="/">Home</a></li>
               <li><a href="/about">About</a></li>
               <li><a href="/contact">Contact</a></li>
           </ul>
       </header>
    </>
  )
}

export default Navbar


// also add the component into you app jsx ---->>
```
```jsx 

const App = () => {
  return (
    <>
    
    {/* navbar here */}

    <Navbar />

      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
      </Routes>
    </>
  )
}

```
---
#### Link tag to optimize page navigation 
- NOTE -> but esmein bhi ek problem hai ! , vo yeh hai ki page reload ho raha hai keoki ham a tag ka use kr rha hai to best way kiya hai ek tag hai Link tag so a tag koi es k sath replace kro yeh react router ka ek feature hai let say...

```jsx 

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
       <header style={{
        width : "full",
        height   : "10rem",
        backgroundColor  : "slateblue"
       }}>
           <ul style={{
             display : "flex",
             justifyContent : "end", listStyle : "none", gap : "30px", 
           }}>    
              {/* Link tag  */}
              <Link to={'/'}>Home</Link>
              <Link to={'/about'}>About</Link>
              <Link to={'/contact'}>Contact</Link>

           </ul>
       </header>
    </>
  )
}

export default Navbar

```

React Routing ka matlab hai app ke andar different URLs ke basis par different UI pages/components dikhana, bina full page reload ke. React Router DOM React me client-side routing implement karne ka sabse common tool hai. [reactrouter](https://reactrouter.com/start/declarative/routing)
## Routing kya hoti hai
Routing simple language me “URL change hone par kaunsa component dikhana hai” ye decide karna hota hai. Traditional websites me har page change par server se naya HTML aata tha, lekin React SPA me app same rehti hai aur sirf component swap hota hai. [reactrouter](https://reactrouter.com/start/declarative/routing)

Example:
- `/` → Home
- `/about` → About
- `/products/12` → Product details

React Router URL ko component se map karta hai. [reactrouter](https://reactrouter.com/start/declarative/routing)
## React Router DOM kya hai
React Router DOM React ke liye routing library hai. Ye browser URL ko read karti hai, matching route find karti hai, aur us route ka component render karti hai. [reactrouter](https://reactrouter.com/start/declarative/routing)

Basic idea:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Yahan:
- `BrowserRouter` app ko routing context deta hai.
- `Routes` routes ko hold karta hai.
- `Route` path aur component ko connect karta hai. [geeksforgeeks](https://www.geeksforgeeks.org/reactjs/what-is-react-router-dom/)
## BrowserRouter
`BrowserRouter` modern React apps me mostly used router hai. Ye clean URLs use karta hai, jaise `/about`, `/profile`, `/dashboard`. Ye browser history API par based hota hai, isliye back/forward buttons naturally kaam karte hain. [iifx](https://iifx.dev/en/articles/306210341)

Use case:
- Modern production apps
- Server support available ho
- Clean, SEO-friendly URLs chahiye ho

Example:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>
```

Important:
- Refresh par server ko proper route handle karna aana chahiye, warna 404 aa sakta hai. [youtube](https://www.youtube.com/watch?v=OEArTtz10Vw)
## HashRouter
`HashRouter` URL me `#` use karta hai, jaise `/#/about`. Browser `#` ke baad wale part ko server tak nahi bhejta, isliye static hosting ya GitHub Pages jaisi jagah par ye useful hota hai. [iifx](https://iifx.dev/en/articles/306210341)

Use case:
- GitHub Pages
- Static hosting where server-side route fallback nahi hai
- Simple deployment without server config

Example:

```jsx
import { HashRouter, Routes, Route } from "react-router-dom";

<HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</HashRouter>
```

Important:
- URL thoda messy dikhta hai.
- But refresh issue kam hota hai because hash client-side handle hota hai. [velog](https://velog.io/@ihan1004/React-Router%EC%97%90%EC%84%9C-BrowserRouter-vs-HashRouter-%EC%B0%A8%EC%9D%B4%EC%A0%90-%EC%99%84%EC%A0%84-%EC%A0%95%EB%A6%AC)
## HistoryRouter
`HistoryRouter` usually browser history se related routing setup ko refer karta hai. Conceptually ye clean URL navigation ke saath browser history API par depend karta hai, which is the same underlying idea as `BrowserRouter` in modern usage. [iifx](https://iifx.dev/en/articles/306210341)

Use case:
- Jab aapko history-based navigation chahiye
- Custom history integration in advanced setups

Simple wording:
- “URL clean rahe aur back/forward buttons ka natural behavior mile” to history-based routing use hoti hai.
## MemoryRouter
`MemoryRouter` URL ko browser address bar me nahi likhta. Ye memory me route state rakhta hai. Isliye ye testing, React Native, storybook, ya isolated component rendering ke liye useful hota hai. [reactrouter](https://reactrouter.com/start/declarative/routing)

Use case:
- Unit tests
- Non-browser environments
- Temporary routing inside a component demo or embedded view

Example:

```jsx
import { MemoryRouter, Routes, Route } from "react-router-dom";

<MemoryRouter initialEntries={["/about"]}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</MemoryRouter>
```
## Router
`Router` generic term hai. Matlab koi bhi routing system jo URL/state aur UI ko connect kare. React Router DOM me `BrowserRouter`, `HashRouter`, `MemoryRouter` sab router types hain. [reactrouter](https://reactrouter.com/start/declarative/routing)

Easy words:
- Router = “page ka direction manager”
- Path badle → component badle
## StaticRouter
`StaticRouter` mostly server-side rendering ke liye use hota hai. Isme route state static hoti hai, browser history ko control nahi kiya jata, because server render ke time URL already known hota hai. [reactrouter](https://reactrouter.com/start/declarative/routing)

Use case:
- SSR / pre-rendering
- Server se HTML generate karte waqt
- Test environments where browser navigation isn’t needed
## Mostly used kaun sa hai
Most modern React web apps me **BrowserRouter** sabse zyada used hota hai. [iifx](https://iifx.dev/en/articles/306210341)

Simple rule:
- Normal web app + proper server support → `BrowserRouter`
- Static hosting / GitHub Pages → `HashRouter`
- Testing / storybook / isolated render → `MemoryRouter`
- SSR → `StaticRouter`
## Real world code base me kya matter karta hai
Main cheezein jo matter karti hain:
- Clean URLs chahiye ya hash URL acceptable hai.
- Refresh par route fallback server handle kar sakta hai ya nahi.
- App browser-based hai ya test/SSR environment me render ho rahi hai.
- Navigation ka back/forward behavior important hai ya nahi. [iifx](https://iifx.dev/en/articles/306210341)

Production apps me:
- BrowserRouter + nested routes + route params + protected routes common hai.
- HashRouter tab choose hota hai jab deployment constraints ho.
- MemoryRouter mostly app code me nahi, testing me aata hai.
## Easy summary
- **Routing** = URL ke hisaab se component dikhana.
- **React Router DOM** = React me routing karne ki library.
- **BrowserRouter** = clean URLs, most common.
- **HashRouter** = `#` URLs, static hosting ke liye useful.
- **MemoryRouter** = memory-based, testing ke liye.
- **StaticRouter** = SSR/server render ke liye.

If tum React seekh rahe ho, pehle ye 4 cheezein samajh lo:
1. `BrowserRouter`
2. `Routes`
3. `Route`
4. `Link` / `useNavigate`

Yehi daily use me sabse zyada aayenge. [reactrouter](https://reactrouter.com/start/declarative/routing)

Would you like a very simple React Router example with Home, About, and Contact pages next?


For **basics mastery**, you should understand **both** approaches, but for a **new modern React app**, the better default is the **Data Router approach** with `createBrowserRouter` and `RouterProvider` because React Router recommends Data Mode for loading, actions, pending states, and route configuration outside render. [reactrouter](https://reactrouter.com/api/data-routers/RouterProvider)

The older JSX-based `BrowserRouter + Routes + Route` approach is still valid and common in existing codebases, but it does not participate in the newer data-loading and action features, so it matters mainly for older apps, simple demos, and interview familiarity. [reactrouter](https://reactrouter.com/start/modes)
## Routing meaning
Routing means mapping a URL to a UI screen or layout. In React, this is usually **client-side routing**, so the app changes views without a full page reload, and React Router matches the current URL to the route configuration. [reactrouter](https://reactrouter.com/start/declarative/routing)

A simple mental model is:

```text
URL -> Route match -> Component/Layout renders
/about -> About route -> <About />
/profile/aman -> Profile route -> <Profile />
```
## Two approaches
### Data Router
Data Routers define the whole route tree up front using `createBrowserRouter(...)`, then render it through `RouterProvider`. React Router says this enables synchronous matching plus loaders, actions, pending states, and avoids some waterfall-style rendering patterns. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)

Basic example:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

Use this for:
- new apps,
- apps that will fetch route data,
- forms handled at route level,
- nested layouts with scalable routing. [reactrouter](https://reactrouter.com/start/modes)
### Declarative JSX routing
This is the classic style using `BrowserRouter`, `Routes`, and `Route` directly inside JSX. It is easier for beginners to read and still works well for small apps, but React Router notes these routes do not participate in data loading, actions, code splitting, or other route-module features. [reactrouter](https://reactrouter.com/start/modes)

Example:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
```

Use this for:
- old codebases,
- basic apps,
- learning the routing mental model first. [reactrouter](https://reactrouter.com/api/components/Route)
## Which is best
For **modern projects**, learn **Data Router first**, because that is the recommended mode for web apps and unlocks the most important modern features. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)

For **job readiness**, you should also know the older declarative style because many existing codebases still use `BrowserRouter`, `Routes`, and `Route`. [reactrouter](https://reactrouter.com/start/modes)

So the practical answer is:

- **Best for new apps:** `createBrowserRouter + RouterProvider` [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)
- **Must also know:** `BrowserRouter + Routes + Route` for legacy and simple apps [reactrouter](https://reactrouter.com/api/components/Route)
## Core pieces
### `RouterProvider`
`RouterProvider` renders the UI for a router instance, and React Router says it should usually live at the top of the app tree. The router should be created once outside the React render tree. [reactrouter](https://reactrouter.com/api/data-routers/RouterProvider)

```jsx
const router = createBrowserRouter([...]);

<RouterProvider router={router} />
```
### `Route`
A `Route` connects a path pattern to what should render when that pattern matches. In declarative mode, `Route` must be inside `Routes`. [reactrouter](https://reactrouter.com/api/components/Route)

```jsx
<Route path="/about" element={<About />} />
```
### `Link`
`Link` is the React Router version of navigation. It changes the URL and view without triggering a full page reload. [reactrouter](https://reactrouter.com/start/modes)

```jsx
<Link to="/about">About</Link>
```
### `NavLink`
`NavLink` is like `Link`, but it knows when it is active, so it is great for menus and sidebars where the current page should be highlighted. [reactrouter](https://reactrouter.com/start/modes)

```jsx
<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  About
</NavLink>
```
### Dynamic route params
A route can include variable pieces like `:username`. That value can then be read inside the component. [reactrouter](https://reactrouter.com/start/declarative/routing)

```jsx
{ path: "/profile/:username", element: <Profile /> }
```

Mental model:

```text
/profile/aman
:username = "aman"
```
## Nested routing and `Outlet`
Nested routing means one route can contain child routes. This is very important in real apps because you often want a layout like header/sidebar to stay fixed while the inner page changes. [stackoverflow](https://stackoverflow.com/questions/78416764/how-to-use-createbrowserrouter-in-react-react-router-dom)

`Outlet` is the placeholder where child routes render.
### Easy idea
Think of a layout like this:

```text
Header
Sidebar
Main content area -> child page appears here
Footer
```

`Outlet` is that “main content area”.
### Example
```jsx
import { Outlet, Link } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

Routes:

```jsx
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "profile", element: <h2>Profile Page</h2> },
      { path: "settings", element: <h2>Settings Page</h2> },
    ],
  },
]);
```

Result:
- `/dashboard/profile` -> layout stays, profile inside `Outlet`
- `/dashboard/settings` -> layout stays, settings inside `Outlet` [stackoverflow](https://stackoverflow.com/questions/78416764/how-to-use-createbrowserrouter-in-react-react-router-dom)

This is one of the **most important routing concepts** in real codebases because dashboards, admin panels, account sections, and docs sites all use persistent layouts. [reactrouter](https://reactrouter.com/start/declarative/routing)
## Real-world use cases
### Small site
For a simple portfolio or mini app:
- Home
- About
- Contact
- 404 page

Declarative routing is often enough. [reactrouter](https://reactrouter.com/start/modes)
### Dashboard app
For a real product:
- `/login`
- `/dashboard`
- `/dashboard/users`
- `/dashboard/settings`
- `/products/:id`

Data Router is usually better because nested layouts, loaders, route actions, and centralized route structure scale better. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)
### Protected sections
Apps often protect pages like `/dashboard` behind auth. This is typically handled with layout routes or guard-like route elements in both styles, but Data Router tends to fit better in larger apps because route config is centralized. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)
## Step-by-step learning order
Learn routing in this exact order:

1. What routing means: URL -> component. [reactrouter](https://reactrouter.com/start/declarative/routing)
2. `BrowserRouter`, `Routes`, `Route`. [reactrouter](https://reactrouter.com/api/components/Route)
3. `Link` and `NavLink`. [reactrouter](https://reactrouter.com/start/modes)
4. Dynamic routes like `:id` or `:username`. [reactrouter](https://reactrouter.com/start/declarative/routing)
5. Nested routes + `Outlet`. [stackoverflow](https://stackoverflow.com/questions/78416764/how-to-use-createbrowserrouter-in-react-react-router-dom)
6. 404 route with `"*"`. [reactrouter](https://reactrouter.com/api/components/Route)
7. Then move to `createBrowserRouter` + `RouterProvider`. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)

This order helps because the old style teaches the visual basics, and the Data Router style then feels like an upgrade instead of a shock. [reactrouter](https://reactrouter.com/start/modes)
## What matters most
If your goal is to become strong at React routing basics, the highest-priority topics are:

- `Route`, `Routes`, path matching [reactrouter](https://reactrouter.com/api/components/Route)
- `Link` vs `NavLink` [reactrouter](https://reactrouter.com/start/modes)
- Dynamic params [reactrouter](https://reactrouter.com/start/declarative/routing)
- Nested routes + `Outlet` [stackoverflow](https://stackoverflow.com/questions/78416764/how-to-use-createbrowserrouter-in-react-react-router-dom)
- `createBrowserRouter` + `RouterProvider` for modern apps [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)

The biggest real-world concept is this:

**A route is not just a page; it can also be a layout.** That is why nested routing and `Outlet` matter so much in modern codebases. [stackoverflow](https://stackoverflow.com/questions/78416764/how-to-use-createbrowserrouter-in-react-react-router-dom)
## What to remember
You do **not** need to memorize every router API first. For basics mastery, remember this practical rule set:

- Old style teaches routing syntax quickly. [reactrouter](https://reactrouter.com/api/components/Route)
- New style is better for modern production apps. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)
- `Link` navigates, `NavLink` navigates + knows active state. [reactrouter](https://reactrouter.com/start/modes)
- `Outlet` is where child routes render. [stackoverflow](https://stackoverflow.com/questions/78416764/how-to-use-createbrowserrouter-in-react-react-router-dom)
- Learn both, but build new serious projects with Data Router first. [reactrouter](https://reactrouter.com/api/data-routers/createBrowserRouter)

Would you like the next step as a **full mini project structure** with:
- Home,
- About,
- Dashboard layout,
- nested child routes,
- dynamic profile route,
- and 404 page in both approaches?