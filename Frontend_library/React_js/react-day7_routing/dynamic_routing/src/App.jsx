// import React from 'react'

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Cources from "./pages/Cources";
import Category from "./pages/Category";

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
