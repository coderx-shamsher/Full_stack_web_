## Dynamic route handling testing 

```zsh 

npm create vite@latest

cd reactproject/

npm install --ignore-scripts && npm clean-install

```
--- 

#### setup routing 
```sh
npm i react-router-dom 
```

- main jsx mein react router dom koi config krna hai 
```jsx 
import {BrowserRouter} from  'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
         <App />
    </BrowserRouter>
  </StrictMode>,
)
```
>  create pages/ folder for routes page components , es folder mein ham vo components create krte hain jo ham kisi perticular path/ route par render krnvana hai 
create  home,about, and cources .jsx 

-  Home.jsx 
```jsx
const Home = () => {
  return (
    <div>
      <header
        style={{
          fontSize: "50px",
          color: "gold",
        }}
      >
        <h2> this is Home page 🏠</h2>
      </header>
    </div>
  );
};

export default Home;

```

- About.jsx 
```jsx

const About = () => {
  return (
    <div>
      <header
        style={{
          fontSize: "50px",
          color: "blue",
        }}
      >
        <h2> 👋 this is about page </h2>
      </header>
    </div>
  );
};

export default About;

```

- Cources .jsx 
```jsx

const Cources = () => {
  return (
    <div>
      <header
        style={{
          fontSize: "50px",
          color: "lightblue",
        }}
      >
        <h2>📚📒✏️🖋️🖊️✒️ this is about page 🗂️  </h2>
      </header>
    </div>
  );
};

export default Cources;
```

- Category .jsx 

```jsx 


const Category = () => {
  return (
    <div>
      <header
        style={{
          fontSize: "50px",
          color: "lightblue",
        }}
      >
        <h2>📚📒 this is about page 🗂️ </h2>
      </header>
    </div>
  );
};

export default Category;
```


#### app jsx mein routes config krna hai 

```jsx 
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Cources from "./pages/Cources";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cources" element={<Cources />} />
     
         {/* Dynamic ROuting handling  */}
        <Route path="/cources/:courceid" element={<Category />} />
      </Routes>
    </>
  );
};

export default App;
```
--- 

#### create navbar component
- create components/ folder  
```jsx 
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        style={{
          backgroundColor: "lightcyan",
          fontFamily: "ui-monospace",
          fontSize : "20px",
          borderRadius : "40px"
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "30px",
            gap: "30px",
            color: "black",
          }}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/cources"}>Cources</Link>
        </ul>
      </nav>

    </>
  );
};

export default Navbar;
```


#### react method to use dynamic params 
- use jo /path/anythink type krte hai hame get krna hai data 

```jsx 
import { useParams } from "react-router-dom";

const Category = () => {
  let usersparams  = useParams();
  console.log(usersparams.courceid);

  return (
    <div>
      <header
        style={{
          fontSize: "50px",
          color: "lightblue",
        }}
      >
        <h2>📚📒 this is {usersparams.courceid} page 🗂️ </h2>
      </header>
    </div>
  );
};

export default Category;

```
- yeh puri trah dynamic nhi hai but han tora to hai.. 

#### React usenaviagtion method to navigate easly
- ek header tag mein kuch buttons add kre navbar component mein 
```jsx

     <header>
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px ",
            paddingLeft: "20px",
          }}
        >
          <button
            style={{
              width: "6rem",
              height: "3rem",
              borderRadius: "20px",
              backgroundColor: "sandybrown",
            }}
          >
            Back
          </button>
          <button
            style={{
              backgroundColor: "AccentColor",
              width: "7rem",
              height: "3rem",
              borderRadius: "20px",
            }}
          >
            Back to Home
          </button>
          <button
            style={{
              width: "6rem",
              backgroundColor: "sandybrown",
              height: "3rem",
              borderRadius: "20px",
            }}
          >
            Next{" "}
          </button>
        </ul>
      </header>

```


- here is the navigation features (back, home , next buttons using the usenavigation() ) 
- Navbar jsx with navigation buttons features 
```jsx 

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";
const Navbar = () => {
  let navigate = useNavigate();

  // now lets use this navigate on button click
  return (
    <>
      <nav
        style={{
          backgroundColor: "lightcyan",
          fontFamily: "ui-monospace",
          fontSize: "20px",
          borderRadius: "40px",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "30px",
            gap: "30px",
            color: "black",
          }}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/cources"}>Cources</Link>
        </ul>
      </nav>

      <header>
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px ",
            paddingLeft: "20px",
          }}
        >
          <button
            style={{
              width: "6rem",
              height: "3rem",
              borderRadius: "20px",
              backgroundColor: "sandybrown",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <button
            style={{
              backgroundColor: "AccentColor",
              width: "7rem",
              height: "3rem",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
          <button
            style={{
              width: "6rem",
              backgroundColor: "sandybrown",
              height: "3rem",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate(+1);
            }}
          >
            Next{" "}
          </button>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
```

--- 

### More detailed NOtes and code ---> 

React dynamic routing ka matlab hai URL ka kuch part fixed nahi hota, wo data ke hisaab se badalta hai, jaise `/product/101`, `/product/102`, `/user/rahul`, `/blog/react-hooks`. React Router me ye `:paramName` syntax se banta hai, aur us dynamic value ko padhne ke liye `useParams()` use hota hai. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)

Agar tum React Router me advanced level tak strong hona chahte ho, to sabse important concepts hain: route matching, dynamic params, nested routes, `useParams`, `useNavigate`, `Link`, `NavLink`, `Outlet`, `useLocation`, 404 routes, aur programmatic navigation. Ye sab milkar real-world apps jaise e-commerce, dashboard, blog, profile pages, auth redirects, and search/filter pages banate hain. [reactrouter](https://reactrouter.com/api/hooks/useLocation)
## Dynamic routing
Dynamic route ka simple meaning hai: same component different URL values ke saath alag data show kare. For example, `/products/1` aur `/products/2` dono same `ProductDetails` component khol sakte hain, but different product data render karenge. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)

Example route:

```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

Yahan `:id` dynamic part hai. Agar URL `/products/55` hai, to `id = "55"` milega. React Router ke docs ke mutabik `useParams()` current matched URL ke dynamic params ka object return karta hai. [reactrouter](https://reactrouter.com/api/hooks/useParams)
## `useParams()`
`useParams()` ek hook hai jo URL ke dynamic values read karta hai. Ye tab use hota hai jab route me `:id`, `:slug`, `:username` jaisa parameter ho. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)

Example:

```jsx
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return <h1>Product ID: {id}</h1>;
}
```

Agar user `/products/88` pe jaye, to page par `Product ID: 88` show hoga. `useParams()` object return karta hai, aur child routes parent params ko inherit bhi kar sakte hain. [reactrouter](https://reactrouter.com/api/hooks/useParams)
### Important points about `useParams`
- Param value mostly string hoti hai, even if URL number jaisa lag raha ho. [reactrouter](https://reactrouter.com/api/hooks/useParams)
- Param ka naam route ke `:name` se exactly match hona chahiye. [reactrouter](https://reactrouter.com/api/hooks/useParams)
- Param missing ho to `undefined` aa sakta hai, depending on route match. [reactrouter](https://reactrouter.com/api/hooks/useParams)

Example with multiple params:

```jsx
<Route path="/users/:userId/orders/:orderId" element={<OrderPage />} />
```

```jsx
function OrderPage() {
  const { userId, orderId } = useParams();

  return (
    <div>
      <h2>User: {userId}</h2>
      <h2>Order: {orderId}</h2>
    </div>
  );
}
```
## `useNavigate()`
`useNavigate()` programmatically navigation karne ke liye hota hai. Simple words me, jab tum JavaScript ke through page change karna chahte ho instead of clicking a `Link`, tab `useNavigate()` use hota hai. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)

Example:

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // login successful
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Login</button>;
}
```

Yahan button click ke baad user `/dashboard` par bheja ja raha hai. React Router v6 me old `useHistory` ko replace karke `useNavigate` use hota hai. [stackoverflow](https://stackoverflow.com/questions/73589509/how-can-i-use-react-routes-with-dynamic-params-in-an-onclick-event)
### Important uses of `useNavigate`
- Login ke baad redirect [johnkavanagh.co](https://johnkavanagh.co.uk/articles/dynamic-navigation-with-react-router/)
- Form submit ke baad next page [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)
- Cancel button pe previous page [stackoverflow](https://stackoverflow.com/questions/73589509/how-can-i-use-react-routes-with-dynamic-params-in-an-onclick-event)
- Dynamic navigation like `navigate(/products/${id})` [stackoverflow](https://stackoverflow.com/questions/73589509/how-can-i-use-react-routes-with-dynamic-params-in-an-onclick-event)

Example:

```jsx
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/products/${product.id}`)}>
      View {product.name}
    </button>
  );
}
```
### Back and forward navigation
`navigate(-1)` browser back ki tarah kaam karta hai, aur `navigate(1)` forward ki tarah. Ye imperative navigation pattern me helpful hota hai. [stackoverflow](https://stackoverflow.com/questions/73589509/how-can-i-use-react-routes-with-dynamic-params-in-an-onclick-event)

```jsx
<button onClick={() => navigate(-1)}>Go Back</button>
```
## `Link` vs `useNavigate`
`Link` tab use karo jab UI me normal navigation button/link dikhana ho. `useNavigate` tab use karo jab logic ke baad navigation karni ho. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)

Difference:

- `Link` = user click-based navigation [johnkavanagh.co](https://johnkavanagh.co.uk/articles/dynamic-navigation-with-react-router/)
- `useNavigate` = JavaScript-based navigation [stackoverflow](https://stackoverflow.com/questions/73589509/how-can-i-use-react-routes-with-dynamic-params-in-an-onclick-event)

Example `Link`:

```jsx
<Link to="/products/10">Open Product 10</Link>
```

Example `useNavigate`:

```jsx
<button onClick={() => navigate("/products/10")}>Open Product 10</button>
```
## Full dynamic routing example
Ye example basics + real-world pattern dono cover karta hai. [reactrouter](https://reactrouter.com/api/hooks/useParams)

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 25000 },
  { id: 3, name: "Headphones", price: 3000 },
];

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/products">Go to Products</Link>
    </div>
  );
}

function Products() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => navigate(`/products/${product.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <Link to="/products">Back to products</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
```
### Is example me kya ho raha hai
- `/products` list page show karta hai.  
- button click pe `useNavigate()` dynamic URL banata hai. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)
- `/products/:id` route same component ko different IDs ke saath use karta hai. [reactrouter](https://reactrouter.com/api/hooks/useParams)
- `useParams()` URL se `id` nikalta hai. [reactrouter](https://reactrouter.com/api/hooks/useParams)
- Data array me matching product find hota hai.  
- Invalid ID ho to fallback UI dikhaya jata hai, jo real-world me important hai. [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
## Dynamic routes in real projects
Dynamic routing mostly in cases me use hoti hai:

- Product details page: `/products/:id` [youtube](https://www.youtube.com/watch?v=5bLFrkJMteU)
- User profile: `/users/:username` [johnkavanagh.co](https://johnkavanagh.co.uk/articles/dynamic-navigation-with-react-router/)
- Blog details: `/blog/:slug` [youtube](https://www.youtube.com/watch?v=5bLFrkJMteU)
- Order details: `/orders/:orderId` [reactrouter](https://reactrouter.com/api/hooks/useParams)
- Admin pages: `/dashboard/users/:userId` [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)

Real-world rule:
- Public display URLs ke liye slug acha hota hai, like `/blog/react-router-guide`
- Database fetch ke liye IDs safer hote hain because unique aur predictable matching hoti hai. [youtube](https://www.youtube.com/watch?v=5bLFrkJMteU)
## Nested dynamic routing
Advanced apps me route sirf dynamic nahi hota, nested bhi hota hai. Yani layout same rehta hai aur andar child route dynamic hota hai. React Router me child routes parent params inherit karte hain. [reactrouter](https://reactrouter.com/api/hooks/useParams)

Example:

```jsx
<Route path="/users/:userId" element={<UserLayout />}>
  <Route path="profile" element={<UserProfile />} />
  <Route path="orders/:orderId" element={<UserOrder />} />
</Route>
```

Possible URLs:
- `/users/5/profile`
- `/users/5/orders/2001`

Child component me dono params mil sakte hain because inherited params available hote hain. [reactrouter](https://reactrouter.com/api/hooks/useParams)

Example:

```jsx
function UserOrder() {
  const { userId, orderId } = useParams();

  return <h2>User {userId} - Order {orderId}</h2>;
}
```
## `Outlet`
Nested routes ko render karne ke liye `Outlet` use hota hai. Ye child route ka placeholder hota hai. [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)

Example:

```jsx
import { Outlet, Link } from "react-router-dom";

function UserLayout() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="orders/101">Order 101</Link>
      </nav>

      <Outlet />
    </div>
  );
}
```

Without `Outlet`, child route screen par render nahi hoga. Ye concept bahut important hai because dashboards, account sections, and admin layouts isi par depend karte hain. [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
## `NavLink`
`NavLink` ek special `Link` hai jo active route ko detect kar leta hai. Navigation menus ke liye ye bahut useful hai. [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)

Example:

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/products"
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  Products
</NavLink>
```

Jab user `/products` route par hoga, to `active-link` class lag jayegi. Sidebar, navbar, tab navigation me ye most useful hota hai. [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
## `useLocation()`
`useLocation()` current location object deta hai. Ye useful hota hai jab tumhe current path dekhna ho, query string read karni ho, ya route change par side effect run karna ho. [reactrouter](https://reactrouter.com/api/hooks/useLocation)

Example:

```jsx
import { useLocation } from "react-router-dom";

function CurrentPath() {
  const location = useLocation();

  return <p>Current path: {location.pathname}</p>;
}
```

Real-world uses:
- analytics trigger on page change [reactrouter](https://reactrouter.com/api/hooks/useLocation)
- conditional layout hide/show
- current pathname check
- query string access
## Dynamic route vs query params
Ye confusion bahut common hai.
### Dynamic route param
Path ka part hota hai:

```text
/products/10
```

Route:
```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

Use:
- product id
- user id
- blog slug [reactrouter](https://reactrouter.com/api/hooks/useParams)
### Query params
URL ke end me `?key=value` format hota hai:

```text
/products?category=mobile&sort=price
```

Use:
- search
- filters
- sorting
- pagination [youtube](https://www.youtube.com/watch?v=5bLFrkJMteU)

Rule:
- Identity ke liye dynamic route param
- Options/filter ke liye query params
## `useParams` + data fetching pattern
Most real apps me `useParams()` ka use API fetch ke saath hota hai. URL se ID lo, phir us ID ke basis par data fetch karo. [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)

Example:

```jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return <h1>{product.title}</h1>;
}
```

Important concept:
Jab route change hota hai from `/products/1` to `/products/2`, component same reh sakta hai but `id` change hoti hai, isliye `useEffect` dependency me `id` dena important hota hai. Ye advanced but very practical point hai. [reactrouter](https://reactrouter.com/api/hooks/useParams)
## Route params change but component same
Ye beginner confusion hota hai: “same component fir se mount hoga ya update hoga?”  
Usually React Router same route component ko different params ke saath re-render/update karwata hai, aur tumhe `param` change handle karna hota hai. Isliye side effects and data fetches often param-dependent hote hain. [reactrouter](https://reactrouter.com/api/hooks/useParams)

Example:
- `/products/1`
- then `/products/2`

Route same:
```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

Component same hai, but `id` change hui. So logic should respond to the new param. [reactrouter](https://reactrouter.com/api/hooks/useParams)
## 404 and invalid params
Dynamic route hone ka matlab ye nahi ki har param valid hoga. `/products/99999` aa sakta hai but product exist nahi karta. Real app me 2 checks zaroori hote hain:

- Route match hua ya nahi
- Param ka data mila ya nahi

Example:

```jsx
if (!product) {
  return <h2>Product not found</h2>;
}
```

Ye production-level behavior ka part hai. [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
## Most important hooks and methods
Ye React Router ke most important pieces hain, especially dynamic routing ke context me:

| Hook / Component | Kaam |
|---|---|
| `BrowserRouter` | App ko routing context dena.  [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga) |
| `Routes` | Route matching container.  [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga) |
| `Route` | Path ko component se map karna.  [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga) |
| `Link` | Click-based client-side navigation.  [johnkavanagh.co](https://johnkavanagh.co.uk/articles/dynamic-navigation-with-react-router/) |
| `NavLink` | Active-state aware navigation.  [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga) |
| `useParams` | Dynamic URL values read karna.  [reactrouter](https://reactrouter.com/api/hooks/useParams) |
| `useNavigate` | Programmatic navigation.  [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/) |
| `Outlet` | Nested child route render placeholder.  [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga) |
| `useLocation` | Current URL/location object read karna.  [reactrouter](https://reactrouter.com/api/hooks/useLocation) |
## Easy mental model
Dynamic routing ko is tarah yaad rakho:

- `Route` path define karta hai  
- `:id` path ka variable part hota hai [reactrouter](https://reactrouter.com/api/hooks/useParams)
- `useParams()` us variable ko read karta hai [reactrouter](https://reactrouter.com/api/hooks/useParams)
- `Link` ya `useNavigate()` user ko us route tak le jaate hain [stackoverflow](https://stackoverflow.com/questions/73589509/how-can-i-use-react-routes-with-dynamic-params-in-an-onclick-event)
- `Outlet` nested route ko render karta hai [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
- `useLocation()` current page details batata hai [reactrouter](https://reactrouter.com/api/hooks/useLocation)
## Master karne ka best order
Agar tum is topic ko strong karna chahte ho to ye order follow karo:

1. Static routes: `/`, `/about`, `/contact` [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
2. `Link` and `NavLink` [johnkavanagh.co](https://johnkavanagh.co.uk/articles/dynamic-navigation-with-react-router/)
3. Dynamic route: `/products/:id` [reactrouter](https://reactrouter.com/api/hooks/useParams)
4. `useParams()` [reactrouter](https://reactrouter.com/api/hooks/useParams)
5. `useNavigate()` [codesanskriti](https://codesanskriti.com/courses/react/lesson-22-useparams-usenavigate/)
6. Nested routes + `Outlet` [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
7. `useLocation()` [reactrouter](https://reactrouter.com/api/hooks/useLocation)
8. Invalid routes and 404 handling [dev](https://dev.to/michaellarocca/how-to-set-up-dynamic-routing-with-react-router-2lga)
9. Param-based data fetching [youtube](https://www.youtube.com/watch?v=5bLFrkJMteU)
## Real mastery point
React dynamic routing ka sabse important real-world idea ye hai:  
**URL sirf address nahi hota, URL app state ka part hota hai.** Product ID, selected user, open tab, filters, and current section sab URL se control ho sakte hain. Dynamic routing isi wajah se powerful hai. [reactrouter](https://reactrouter.com/api/hooks/useLocation)

Agar tum ye concepts solid kar lo — `Route`, `Link`, `useParams`, `useNavigate`, `Outlet`, `useLocation` — to React Router DOM ka strong foundation ban jata hai, aur phir protected routes, loaders, query params, and data routers samajhna kaafi easy ho jata hai. [reactrouter](https://reactrouter.com/api/hooks/useParams)

Would you like me to teach this next with one **complete mini project structure** like Product List -> Product Details -> User Profile -> Dashboard Nested Routing, all connected in one clean example?