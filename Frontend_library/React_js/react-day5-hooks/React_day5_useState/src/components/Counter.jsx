import React, { useState } from "react";

const Counter = () => {
  const [count, setcount] = useState(0);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "18rem",
            height: "8rem",
            backgroundColor: "grey",
            paddingLeft: "30px",
            paddingTop: "30px",
            paddingBottom: "30px",
            paddingRight: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{fontSize:"50px"}}> {count} </h2>
        </div>

        <div
          className="button_divContainer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <button
            style={{
              width: "10rem",
              height: "3rem",
              backgroundColor: "skyblue",
              padding: "20px",
              fontSize: "15px",
              color: "black",
            }}
            onClick={() => {
              setcount(count - 1);
            }}
          >
            click to decrease
          </button>

          <button
            style={{
              width: "10rem",
              height: "3rem",
              backgroundColor: "skyblue",
              padding: "20px",
              fontSize: "15px",
              color: "black",
            }}
            onClick={() => {
              setcount(0);
            }}
          >
            reset to 0
          </button>

          <button
            style={{
              width: "10rem",
              height: "3rem",
              backgroundColor: "skyblue",
              padding: "20px",
              fontSize: "15px",
              color: "black",
            }}
            onClick={() => {
              setcount(count + 1);
            }}
          >
            Click to increase
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
