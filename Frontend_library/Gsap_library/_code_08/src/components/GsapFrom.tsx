// import React from 'react'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const GsapFrom = () => {

    useGSAP(()=>{
       gsap.from("#box1",{
          x : 500,
          duration : 2,
          delay : 1,
          repeat : -1,
        //   yoyo : true, // for in and out smooth animation !

          // ease
        //   ease : "circ.in" // this give specific effect on elements
       })

       gsap.from("#box2",{
         y : 130,
         x : 200,
         duration : 1,
         delay : 1,
         yoyo : true,
         repeat : -1
        })

      //  gsap.to("#box3",{
      //    x : 250,
      //    y : 180 ,
      //    duration : 2,
      //    delay : 1,
      //    yoyo : true,
      //    repeat : -1,
      //    rotation : 360
      //   })
    })

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
            display : "flex", flexDirection : "column",gap :"10px"

          }}
        >
          <h2>Gsap From </h2>
          <p>
            {" "}
            The <code>gsap.from()</code> method is used to animate elements from
            a new state to their current state.
          </p>

          <p>
            {" "}
            the <code>gsap.from()</code> is similar to the{" "}
            <code>gsap.to()</code> method but the differ is that the .from
            method animates elements from their new state to their current
            state, while the .to animates elements from their current state to
            new state.{" "}
          </p>
        </div>

        <div
          className="boxes"
          style={{
            paddingTop: "40px",
            display : "flex",
            flexDirection : "column", gap : "20px"
          }}
        >
          <div
            className="box"
            id="box1"
            style={{
              width: "20rem",
              height: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "AccentColor",
              borderRadius: "50px",
            }}
          >
            Box Move in X Axis !
          </div>

          <div className="box" id="box2" style={{
              width: "20rem",
              height: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "darkgoldenrod",
              borderRadius: "50px",
            }}>
            Box Move In Y Axis !
          </div>
        </div>
      </div>
    </>
  );
};

export default GsapFrom;
