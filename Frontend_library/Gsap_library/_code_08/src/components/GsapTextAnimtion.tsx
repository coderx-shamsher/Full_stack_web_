import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const GsapTextAnimtion = () => {
  let headtext = useRef(null);

  useGSAP(() => {
    if (!headtext.current) return;

    let h1 = headtext.current.textContent as string;

    console.log(h1, typeof h1);
    // console.log(h1.split(""));
    let splitedtext = h1.split("");

    let splitedElement = splitedtext
      .map(
        (e: string) =>
          `<span style="display: inline-block;" class="text">${e}</span>`,
      )
      .join("");
    console.log(splitedElement);

    headtext.current.innerHTML = splitedElement;

    gsap.from(".text", {
      stagger: 0.1,
      y: -70,
      scale: 1.8,
      opacity: 0,
      easeReverse: "bounce",
    });
    gsap.from(".main_section p", {
      stagger: 0.1,
      delay: 0.8,
      y: 70,
      opacity: 0,
      easeReverse: "bounce",
    });
  }, []);

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
          <h2 id="head" ref={headtext}>
            GsapTextAnimtion{" "}
          </h2>
          <p>
            {" "}
            The GSAP stagger is a feature that allows you to apply animations
            with a staggered delay to a group of elements.
          </p>

          <p>
            By using the stagger feature in gsap, you can specify the amount of
            time to stagger the animations between each element, as well as
            customize the easing and duration of each individual animation. This
            enables you to create dynamic and visually appealing effects, such
            as staggered fades, rotations, movements and more......
          </p>
        </div>
      </div>
    </>
  );
};

export default GsapTextAnimtion;
