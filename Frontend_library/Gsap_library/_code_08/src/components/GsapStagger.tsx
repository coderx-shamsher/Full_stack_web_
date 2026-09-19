import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GsapStagger = () => {
  useGSAP(() => {

    const t1 = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    t1.to(".staggerbox", {
      y: 250,
       borderTopRightRadius: "0",
      borderTopLeftRadius: "0",
      borderBottomRightRadius: "8rem",
      borderBottomLeftRadius: "8rem",

      // using the stagger 
    //   stagger : 0.6 // basic use 

      // with more sub properties ! 
      stagger : {
        amount : 0.9, // more less more fast ! 
        // grid : "auto"  // rows and columns , i dont get it all but auto use krna shi hai ! 
        // axis : 'x',
        // axis : 'y',
       from : "random" // this is interesting !! 
       

      }

    });

    t1.to(".staggerbox", {
      borderBottomRightRadius: "0",
      borderBottomLeftRadius: "0",
      borderTopRightRadius: "8rem",
      borderTopLeftRadius: "8rem",
    });
  });
  
  // now see the problem is k mere elements sare he same time te react kr rahe hai i want k ek ek kr k animate hon let use stagger property 
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
          <h2>Gsap Stagger</h2>
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

        <section
          style={{
            marginTop: "40px",
            display: "flex",
            width: "100%",
            height: "20vh",
            gap: "50px",
          }}
        >
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(219, 232, 241, 0.85)",
              width: "8rem",
              height: "4",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(134, 199, 243, 0.85)",
              width: "8rem",
              height: "4",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(42, 162, 243, 0.85)",
              width: "8rem",
              height: "4",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(0, 143, 238, 0.85)",
              width: "8rem",
              height: "4",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(41, 37, 250, 0.85)",
              width: "8rem",
              height: "4",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(81, 8, 141, 0.85)",
              width: "8rem",
              height: "4",
            }}
          ></div>
        </section>
      </div>
    </>
  );
};

export default GsapStagger;
