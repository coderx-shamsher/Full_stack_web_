import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Custom from "./pages/Custom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Category from "./pages/Category";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* first way to do nested routing  */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/admin/users" element={<Users />} /> */}

        {/* Nested Routing code -->> 1) hame self closing tags nhi pair tags use krna hai usk ander ham nested route create kr sakte  */}
        <Route path="/admin" element={<Admin />}>
             <Route path="users" element={<Users />} />
        </Route>

        <Route path="/products" element={<Products/>} />
        <Route path="/products/:params" element={<Category/>}/>

        {/* not found page handling  */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="*" element={<Custom />} />
      </Routes>
   
    </>
  );
};

export default App;
