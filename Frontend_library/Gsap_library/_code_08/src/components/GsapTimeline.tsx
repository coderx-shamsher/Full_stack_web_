// import React from 'react'

import { useGSAP } from "@gsap/react";
// import { time } from "console";
// import { time } from "console";
import gsap from "gsap";

const GsapTimeline = () => {
  // create a timeline
  // const timeline = gsap.timeline()
  const timeline = gsap.timeline({
    yoyo: true,
    repeat: -1,
  });
  // we can add some addional properties in timeline !

  useGSAP(() => {
    // now ham gsap ki jagah use krenge timeline jo hamne create kiya hai
    // esa use keo krna hai ? simple ager ham basic gsap (fromTO, yan to,from bhi use krte hain to hame ek sequence animates create kr skte hain but hame phale value animation ki duration + delay ko calculate kr k then next animation plan krni hogi, that really a drag ! when we have helper !>>)

    // first yeh run hoga
    timeline.to("#bx1", {
      x: "200",
      rotation: "180",
      opacity: 0,
    });

    // second yeh run hoga
    timeline.to("#bx1", {
      opacity: 1,
      x: 200,
      y: 100,
      rotation: "280",
    });

    // 3rd

    timeline.to("#bx1", {
      y: -100,
      rotation: 360,
    });

    // forth
    timeline.to("#bx1", {
      x: 700,
      rotation: 360,
      borderRadius: "100%",
      ease: "back.inOut",
    });
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
          <h2>Gsap Timeline</h2>
          <p>
            {" "}
            The <code>gsap.timeline()</code> method is used to create a timeline
            instance that can be used to manage multiple animations.
          </p>

          <p>
            {" "}
            The <code>gsap.fromTo()</code> is similar to the{" "}
            <code>gsap.from(), gsap.to() </code> and <code>gsap.fromTo()</code>{" "}
            methods, but the differ is, ek order mein animations perform hoti
            hai...
          </p>
        </div>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            // gap: "10px",
            marginTop: "40px",
            padding: "20px",
          }}
        >
          <div
            className="button"
            style={{
              marginBottom: "20px",
              paddingLeft: "10px",
            }}
          >
            <button
              style={{
                padding: "20px",
                backgroundColor: "slategrey",
                borderRadius: "20px",
              }}
              onClick={() => {
                if (timeline.paused()) {
                  timeline.play();
                } else {
                  timeline.pause();
                }
              }}
            >
              Play/Pause
            </button>
          </div>
          <div
            className="box"
            id="bx1"
            style={{
              width: "10rem",
              height: "10rem",
              borderRadius: "20px",
              backgroundColor: "darkgoldenrod",
            }}
          ></div>
        </section>
      </div>
    </>
  );
};

export default GsapTimeline;
