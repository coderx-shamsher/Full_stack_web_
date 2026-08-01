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
