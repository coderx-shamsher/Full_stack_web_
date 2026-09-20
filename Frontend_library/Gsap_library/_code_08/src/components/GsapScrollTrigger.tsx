import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import  { useRef } from "react";

// in react first import plugin
import { ScrollTrigger } from "gsap/all";

// and then register in gsap -> 
gsap.registerPlugin(ScrollTrigger)

const GsapScrollTrigger = () => {
    
    const scrollref = useRef<HTMLElement>(null);

    useGSAP(()=>{
       const boxes = gsap.utils.toArray(scrollref.current.children)
       
       boxes.forEach((box)=>{
          gsap.to(box,{
            x : 1300,
            rotation : "360",
            scale : 1.4,
            borderRadius : "100%",
            scrollTrigger : {
                trigger : box,
                markers : true ,
                // start : "top 10%",
                start : "top 101%",
                // start : "bottom,bottom",
                // end  : "top 20%",
                end  : "top -10%",
                scrub : 3
            },
            easeReverse : "elastic"
          })
       }) // -> here we can give , {scope : scrollref}
       // now animation to phale he ho gyi ! how to animate base on scroll 
    
     console.log(boxes,typeof boxes);

    },[])

    useGSAP(()=>{
      const timeline  = gsap.timeline()
       
      timeline.to("#bx1", {
         scrollTrigger : {
            trigger : "#bx1",
            markers : true,
            scrub : 3, 
            start : "top 100%",
            end : "top -10%"

         },
          x : 1000,
          y : 200,
          rotationZ : '280',
        })

      timeline.to("#bx2", {
            y : -200,
            x : 1000,
            rotation : "360",
             scrollTrigger : {
            trigger : "#bx1",
            markers : true,
            scrub : 3, 
            start : "top 100%",
            end : "top -10%"
         },
         easeReverse : "bounce.out"
      })

        timeline.from("#bx3", {
            y : -400,
            x : 1000,
            rotationX : "180",
            // borderBottomRightRadius : "10rem",
             scrollTrigger : {
            trigger : "#bx1",
            markers : true,
            scrub : 3, 
            start : "top 100%",
            end : "top -10%"
         },
         easeReverse : "bounce.out"
      })
        timeline.from("#bx4", {
            y : -400,
            x : 1000,
            rotationX : "180",
            // borderBottomRightRadius : "10rem",
             scrollTrigger : {
            trigger : "#bx1",
            markers : true,
            scrub : 3, 
            start : "top 100%",
            end : "top -10%"
         },
         easeReverse : "bounce.out"
      })

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
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h2>Gsap ScrollTrigger</h2>
          <p>
            {" "}
            The GSAP Scroll Trigger is a plugin that allows you to create
            animations that are triggerd by the scroll position of the page.
          </p>

          <p>
            With ScrollTrigger, you can define various actions to be triggered
            at specific scroll points, such as starting or ending an animation,
            scrubbing through animations as the user scrolls, pinning elements
            to the screen, and more.
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

      <div
        className="page2"
        style={{
          backgroundColor: "lightskyblue",
          width: "100%",
          height: "100vh",

          //   display : "flex", justifyContent : "center", alignItems : "center"
        }}
      >
        <section
         ref={scrollref}
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "20vh",
            gap: "50px",
            position: "relative",
          }}
        >
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(219, 232, 241, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              bottom: "-20rem",
              zIndex: 10,
              left: "8rem",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(238, 175, 40, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "10rem",
              left: "2rem",
            }}
          ></div>
          <div
            className="staggerbox"
            style={{
              backgroundColor: "rgba(42, 162, 243, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "33rem",
              left: "2rem",
            }}
          ></div>
        </section>
      </div>

      <div
        className="page3"
        style={{
          backgroundColor: "lightseagreen",
          width: "100%",
          height: "100vh",
          //   display : "flex", justifyContent : "center", alignItems : "center"
        }}
      >
        <section
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "20vh",
            gap: "50px",
            position: "relative",
          }}
        >
          <div
          id="bx1"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(219, 232, 241, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "4rem",
              left: "2rem",
            }}
          ></div>
          <div
          id="bx2"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(236, 187, 51, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "15rem",
              left: "8rem",
            }}
          ></div>
          <div
          id="bx3"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(247, 91, 221, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "26rem",
              left: "10rem",
            }}
          ></div>
          <div
          id="bx4"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(236, 115, 135, 0.99)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "35rem",
              left: "16rem",
            }}
          ></div>
        </section>
      </div>

      <div
        className="page3"
        style={{
          backgroundColor: "lightseagreen",
          width: "100%",
          height: "100vh",
          //   display : "flex", justifyContent : "center", alignItems : "center"
        }}
      >
        <section
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "20vh",
            gap: "50px",
            position: "relative",
          }}
        >
          <div
          id="bx1"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(219, 232, 241, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "4rem",
              left: "2rem",
            }}
          ></div>
          <div
          id="bx2"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(236, 187, 51, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "15rem",
              left: "8rem",
            }}
          ></div>
          <div
          id="bx3"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(247, 91, 221, 0.85)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "26rem",
              left: "10rem",
            }}
          ></div>
          <div
          id="bx4"
            className="staggerbox"
            style={{
              backgroundColor: "rgba(236, 115, 135, 0.99)",
              width: "8rem",
              height: "8rem",
              position: "absolute",
              zIndex: 1,
              top: "35rem",
              left: "16rem",
            }}
          ></div>
        </section>
      </div>
    </>
  );
};

export default GsapScrollTrigger;
