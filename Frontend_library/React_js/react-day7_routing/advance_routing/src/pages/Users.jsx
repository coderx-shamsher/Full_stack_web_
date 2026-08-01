import React from "react";
import { Outlet } from "react-router-dom";
const Users = () => {
  return (
    <div
      id="myheading"
      style={{
        fontSize: "50px",
        color: "seagreen",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <li>User =&gt; arch0x</li>
        <li>User =&gt; admin09</li>
        <li>User =&gt; admin00x</li>
        <li>User =&gt; testadmin0y</li>
      </ul>
    </div>
  );
};

export default Users;
