import React from "react";

const Test_render = () => {
  return (
    <div style={{
        margin : "50px"
    }}>
      <section
        style={{
          width: "30rem",
          height: "20rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px", 
          backgroundColor : "lightskyblue",
          color: "Background",
          borderRadius : "40px",
          flexDirection : 'column'
        }}
      >
        <div>
          <p>Testing rendering </p>
        </div>
        <div>
          <p>using the if else conditional </p>
        </div>
        <div>
          <p>is this is best way to rendering !</p>
        </div>
      </section>
    </div>
  );
};

export default Test_render;
