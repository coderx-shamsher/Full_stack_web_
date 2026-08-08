## Next.js 
Next.js is an open-source, full-stack web development framework built on top of React. Created and maintained by Vercel, it supplies the structural architecture, optimization tools, and backend capabilities that React lacks on its own. While React operates primarily as a user interface (UI) library, Next.js serves as a complete toolkit to build production-ready, highly scalable web applications

- Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
- It also automatically configures lower-level tools like bundlers and compilers. You can instead focus on building your product and shipping quickly.
- Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.


### Next js app setup 
- nextjs + ts(typescript)
```sh

npx create-next-app@latest

```

--- 

## Nextjs folder structure
Here’s the **simple Next.js folder structure** for the latest App Router setup with TypeScript.

## Basic idea
In modern Next.js, your routes live inside the `app/` folder. If you use TypeScript, your page and component files are usually `.tsx` instead of `.js`. Next.js also supports putting source code inside `src/`, which is the cleanest common setup. [nextjs](https://nextjs.org/docs/app/getting-started/project-structure)

## Common structure
```txt
my-next-app/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  └─ about/
│  │     └─ page.tsx
│  ├─ components/
│  ├─ lib/
│  ├─ types/
│  └─ utils/
├─ public/
├─ next.config.ts
├─ tsconfig.json
├─ package.json
└─ .env.local
```

## What each folder means
- `src/app/` = your routes and pages.
- `src/components/` = reusable UI parts like buttons, navbar, cards.
- `src/lib/` = helper code, API calls, database logic.
- `src/types/` = TypeScript types and interfaces.
- `src/utils/` = small helper functions.
- `public/` = images, icons, and static files.
- `tsconfig.json` = TypeScript settings.
- `next.config.ts` = Next.js config file. [nextjs](https://nextjs.org/docs/app/getting-started/project-structure)

## How routing works
```txt
src/app/page.tsx              -> /
src/app/about/page.tsx        -> /about
src/app/blog/page.tsx         -> /blog
src/app/blog/[id]/page.tsx    -> /blog/123
```

So, **folder name = URL name**. This is the main Next.js idea. [nextjs](https://nextjs.org/docs/app/getting-started/project-structure)

## Easy diagram
```txt
app/
├─ page.tsx          = Home page
├─ layout.tsx        = Shared wrapper
├─ about/
│  └─ page.tsx       = /about
├─ blog/
│  ├─ page.tsx       = /blog
│  └─ [id]/
│     └─ page.tsx    = /blog/:id
```

## Important files
- `layout.tsx` = common structure for pages, like header/footer.
- `page.tsx` = actual page content.
- `loading.tsx` = loading UI.
- `error.tsx` = error UI.
- `not-found.tsx` = custom 404 page. [nextjs](https://nextjs.org/docs/app/getting-started/project-structure)

<!-- If you want, I can also give you a **real beginner-friendly Next.js + TypeScript folder structure for a dashboard app** in one clean diagram. -->

> RUN npm server -> npm run dev 

--- 

## Nextjs Components and Jsx 

In Next.js, a **component** is just a function that returns UI. **JSX** is the syntax you use inside that function to write UI in a HTML-like way. [nextjs](https://nextjs.org/learn/react-foundations/building-ui-with-components)

## 1) Component
Think of a component like a **small reusable piece of the page**.

Example:
```tsx
function Header() {
  return <h1>My Website</h1>;
}
```

This is a component because:
- It is a function.
- It returns UI.
- You can reuse it anywhere.

### Why it matters most
The most important thing in Next.js is to think in **components**, not in one big page. Build your app by breaking UI into small parts like `Navbar`, `Button`, `Card`, `Footer`. That makes code easier to read, reuse, and maintain. [nextjs](https://nextjs.org/learn/react-foundations/building-ui-with-components)

## 2) JSX
JSX means **JavaScript + XML-like syntax**. It looks like HTML, but it is written inside JavaScript/TypeScript files. [dev](https://dev.to/johnschibelli/understanding-jsx-and-rendering-elements-in-react-o8j)

Example:
```tsx
const title = <h1>Hello</h1>;
```

JSX lets you:
- Write UI naturally.
- Put JavaScript values inside `{ }`.
- Combine UI and logic in one place.

Example:
```tsx
function Welcome() {
  const name = "Ali";
  return <h1>Hello, {name}</h1>;
}
```

## 3) In Next.js
In the latest Next.js App Router, your page is usually a component inside `app/page.tsx`. Next.js reads that component and renders it as the page. [geeksforgeeks](https://www.geeksforgeeks.org/nextjs/next-js-introduction/)

Example:
```tsx
// app/page.tsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

So:
- `page.tsx` = page component.
- `layout.tsx` = shared wrapper component.
- Other files in `components/` = reusable components.

## 4) What matters most in Next.js
If you are learning Next.js, focus on these first:
- **Components**: build UI in pieces.
- **JSX**: write UI inside React/Next code.
- **Props**: pass data into components.
- **Server vs Client Components**: very important in modern Next.js.
- **Routing with folders**: folder name becomes URL. [nextjs](https://nextjs.org/learn/react-foundations/building-ui-with-components)

## 5) Tiny mental model
```txt
Component = function that returns UI
JSX       = the UI syntax inside that function
Next.js   = uses these components to build pages
```

<!-- If you want, I can next teach you **Components, JSX, Props, State, and Server/Client Components** in the exact order you should learn them, with super simple examples. -->
---

Haan, components aur JSX se **sirf start** hota hai. Next.js mein aur bhi bahut important topics hain, especially **App Router, layouts, props, server/client components, routing, data fetching, forms, and server actions**. [nextjs](https://nextjs.org/learn)

## 1) Practice code
Neeche kuch simple practice examples hain. Inko `app/page.tsx` ya `components/` mein try karo.

### Example 1: Simple component
```tsx
function Welcome() {
  return <h1>Welcome to Next.js</h1>;
}

export default function Home() {
  return <Welcome />;
}
```

### Example 2: Component with props
```tsx
type CardProps = {
  title: string;
  description: string;
};

function Card({ title, description }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  return <Card title="Next.js" description="Powerful React framework" />;
}
```

### Example 3: Reusable Button
```tsx
type ButtonProps = {
  text: string;
};

function Button({ text }: ButtonProps) {
  return <button>{text}</button>;
}

export default function Home() {
  return (
    <div>
      <Button text="Login" />
      <Button text="Sign Up" />
    </div>
  );
}
```

### Example 4: List rendering
```tsx
const fruits = ["Apple", "Banana", "Mango"];

export default function Home() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

### Example 5: Conditional rendering
```tsx
const loggedIn = true;

export default function Home() {
  return <h1>{loggedIn ? "Dashboard" : "Please login"}</h1>;
}
```

## 2) Important subtopics
Next.js mein in cheezon ko zaroor samjho:
- **Components**: UI ke reusable parts.   
- **JSX**: UI likhne ka syntax.
- **Props**: parent se child ko data dena.
- **State**: component ke andar changing data.
- **Event handling**: button click, input change.
- **Conditional rendering**: if/else style UI.
- **List rendering**: `map()` use karna.
- **Layouts**: shared header/footer.
- **Routing**: folder-based pages.
- **Server Components vs Client Components**: very important in latest Next.js.
- **Data fetching**: API/database se data lana.
- **Forms and Server Actions**: user input submit karna.
- **Image, Link, metadata**: Next.js built-in features. [nextjs](https://nextjs.org/learn)

## 3) What matters most
Agar tum beginner ho, to ye order follow karo:
1. Components.
2. JSX.
3. Props.
4. State.
5. Routing with `app/`.
6. Server vs Client Components.
7. Data fetching.
8. Forms and Server Actions. [nextjs](https://nextjs.org/learn)

## 4) Super simple diagram
```txt
UI
 ├─ Component
 │   ├─ JSX
 │   ├─ Props
 │   ├─ State
 │   └─ Events
 ├─ Routing
 ├─ Layouts
 ├─ Data Fetching
 └─ Server/Client Components
```

## 5) Best way to practice
Try this small project:
- `Header`
- `Hero`
- `FeatureCard`
- `Button`
- `Footer`

Phir inko ek page mein combine karo. Isse tum components aur JSX dono strong kar loge. Next.js docs also highlight layouts, navigation, data fetching, rendering, and metadata as core topics beyond basic components. [nextjs](https://nextjs.org/learn)

<!-- Agar chaho, main next message mein tumhe **Next.js components practice sheet 10 exercises ke sath** de deta hoon, bilkul beginner-friendly. -->
--- 

**<<<--- My Next code --->>>**
## next js code 
- create components folder and create tsx file 

```tsx
export default function User(){
    return(
        <div>
             <h3>Username is codez</h3>
             <p>this is the Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis iusto, praesentium deserunt quaerat deleniti ad voluptate. Reiciendis nobis temporibus officiis dolore atque cum quas doloribus. Facere obcaecati voluptates architecto non!</p>  
        </div>
    )
}
```
> THis component is Static component 
- importing file from folders are litte diff from react 
```tsx

import User from "@/components/User";

// hame @/yourfolder  -> yeh syntax hai importing ka 
```

> Dynamic component (ham props pass krte hain tnki values change ho dynamic ho..) let cook
lets create dynamic component with types and props 

```tsx 
type Card_type = {
  username: string;
  role: string;
  uid: number;
};

// just ek type create kra hai now use component mein use krna hai with props
export default function Card({ username, role, uid }: Card_type) {
  return (
    <section
      style={{
        width: "20rem",
        height: "10rem",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        gap : "10px",
        flexDirection : 'column',
        backgroundColor : "lightgray",
        color : "black"
      }}
    >
      <h1>{username}</h1>
      <h3>{role}</h3>
      <h4>{uid}</h4>
    </section>
  );
}

```
- use this dynamic component into page.tsx 

```tsx 
 import Image from "next/image";
import User from "@/components/User";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      {/* <div
        style={{
          width: "10rem",
          height: "4rem",
          backgroundColor: "AccentColor",
        }}
      >
        <h2> Hello its nextjs app </h2>
      </div> */}

      {/* <User/>   */}
      {/* this is static component  */}

      {/* Dynamic component */}

      <div
        style={{
          display: "flex",
          justifyContent: "start",
          paddingLeft : "20px",
          paddingTop : "40px",
          paddingBottom : "50px",
          paddingInline : "20px",
          backgroundColor: "cadetblue",
          gap: "50px",
        flexDirection : 'column'
        }}
      >
        <Card username="coderY" role="admin" uid={10963} />
        <Card username="adminx" role="sudo" uid={10663} />
        <Card username="coder0mini" role="user" uid={10966} />
      </div>


    </>
  );
}

```
- now ham dynamic components koi reuse kr skate hian or with dynamic parameters
--- 
--- 

