let timeline = gsap.timeline()


timeline.from(".logo",{
    y : -50, // up to bottom
    // y : 50, // from bottom to up 
    duration : 0.50,
    delay : 0.50,
    opacity : 0, 
})


timeline.from(".ul_element li",{
    y : -50, // up to bottom
    duration : 0.50,
    opacity : 0, 
    stagger : 0.30
})

let timeline2 = gsap.timeline()
gsap.to(".box1",{
    x: 1290,
    y: 360 ,
     duration : 2,
     delay : 0.25,
     repeat : -1,
     yoyo: true,
     scale : 1.5
})

gsap.to(".box2",{
    // x: 1290,
    y: 380 ,
     duration : 2,
      delay : 0.20,
     repeat : -1,
     yoyo: true
})

gsap.to(".box3",{
    x: 1200,
    // y: 360 ,
     duration : 2,
      delay : 0.20,
     repeat : -1,
     yoyo: true
})


