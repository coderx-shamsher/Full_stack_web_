// import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GsapFromTo = () => {
  useGSAP(() => {
    

    gsap.fromTo(
      "#box1",
      {
        x: 0,
        // x:500,
        rotation: 360,
        borderRadius: "0%",
      },
      {
        x: 600,
        //    x : 0,
        //    rotation : 360,
        //    rotation : 0,
        borderRadius: "100%",
        repeat: -1,
        yoyo: true,
        duration: 2,
      },
    );


     gsap.fromTo("#box2",{
        x : 100,
        scale : 1,
     },{
        x : 10,
        scale : 0.3,
        borderRadius : "0%",
        repeat : -1,
        yoyo : true,
        duration : 2
     })

  });

  return (
    <>
      <div
        className="main_section"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(182, 182, 182, 0.97)",
          paddingTop: "30px",
          paddingLeft: "30px",
        }}
      >
        <div
          className="info"
          style={{
            width: "80%",
            padding: "40px",
            fontSize: "20px",
            backgroundColor: "#11141480",
            borderRadius: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h2>Gsap FromTo</h2>
          <p>
            {" "}
            The <code>gsap.fromTo()</code> method is used to animate elements
            from a new state to a new state !.
          </p>

          <p>
            {" "}
            The <code>gsap.fromTo()</code> is similar to the{" "}
            <code>gsap.from()</code> and <code>gsap.to()</code> method but the
            differ is that the .fromTo method animates elements from their new
            state to a new state , while the .to animates elements from their
            current state to new state, and .from animates from new state to
            current state !.
          </p>
        </div>

        <div
          className="boxes"
          style={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            className="box"
            id="box1"
            style={{
              width: "10rem",
              height: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(187, 33, 33, 0.82)",
              borderRadius: "50%",
            }}
          >
          
          </div>

          <div
            className="box"
            id="box2"
            style={{
              width: "20rem",
              height: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(13, 107, 107, 0.81)",
              borderRadius: "50px",
              paddingBottom: "10px",
            }}
          >
           
          </div>
        </div>
      </div>
    </>
  );
};

export default GsapFromTo;
