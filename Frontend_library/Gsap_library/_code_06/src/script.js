window.addEventListener("wheel", (e) => {
  console.log(e.deltaY)
  if (e.deltaY > 0) {
    // console.log("scroll down");

    gsap.to(".moveing_div", {
      transform: "translateX(-200%)",
      ease: "none",
      repeat: -1,
      duration: 10,
       overwrite: "auto"
      
    });

    gsap.to("img", {
       rotation: 0,
      duration: 0.4,
    });

   
  } else {
    gsap.to(".moveing_div", {
      transform: "translateX(0%)",
      ease: "none",
      repeat: -1,
      duration: 10,
       overwrite: "auto"
    });
  }

  gsap.to("img", {
    rotation: 180,
      duration: 0.4,
  
  });


});

gsap.to(".moveing_div", {
  transform: "translateX(-210%)",
  ease: "none",
  repeat: -1,
  duration: 9,
});
