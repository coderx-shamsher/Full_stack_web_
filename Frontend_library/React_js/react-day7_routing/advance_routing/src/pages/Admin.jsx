import React from "react";
import { Link, Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div id="myheading">
      <header>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            gap: "30px",
          }}
        >
          <Link to="users">users</Link>
        </ul>
      </header>

      <h3
        style={{
          fontSize: "50px",
          color: "lightblue",
        }}
      >
        this is Admin path only for the Admins
      </h3>
      <Outlet />
    </div>
  );
};

export default Admin;
