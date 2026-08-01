import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "ui-sans-serif",
            fontSize: "50px",
            color: "royalblue",
          }} 
          id="myheading"
        >
          {" "}
          404 | Something Wrong with this Path{" "}
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
