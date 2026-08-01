import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header
        style={{
          width: "full",
          height: "4rem",
          backgroundColor: "slategrey",
          borderRadius : "40px"
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop : "18px",
            listStyle: "none",
            gap: "30px",
            paddingRight : '30px'
          }}
        >
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/admin"}>Admin</Link>

        {/* adding more routes for dynamic routing testing */}
         <Link to={'/produts'}>Products</Link>

        </ul>
      </header>
    </>
  );
};

export default Navbar;
