import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header
        style={{
          width: "full",
          height: "10rem",
          backgroundColor: "slateblue",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "end",
            listStyle: "none",
            gap: "30px",
          }}
        >
          {/* <li><a href="/">Home</a></li>
               <li><a href="/about">About</a></li>
               <li><a href="/contact">Contact</a></li> */}

          {/* Link tag  */}
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
