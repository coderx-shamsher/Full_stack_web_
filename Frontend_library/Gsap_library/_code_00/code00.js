// gsap.to("#container1",{
//     x : 1000,
//     // move on x axis 

//     // duration 
//     duration : 3, // 3 seconds tak animate hoga element

//     // delay 
//     delay : 2 // 2 second band animation suru hoga... 


// })


// con 2 
// gsap.to("#container2",{
//     x : 1000,
//     // y: 350,   // also move in y axis this box
//     duration : 4,
//     delay : 2
// })


// 
// gsap.from("#container1",{
//     x: 1000,
//     // y : 500,
//     duration : 3,
//     delay : 2 
// })

// lets use css properties 

// gsap.from("#container1",{
//     x: 1000,
//     // y : 500,
//     duration : 3,
//     delay : 2,

//     // rotate propety 
//     rotate : 360  // 360 degree rotation 
// })


// gsap.to("#container2",{
//     x : 1000,
//     // y: 350,   // also move in y axis this box
//     duration : 4,
//     delay : 2,
//     rotate : 280,
//     backgroundColor : "lightblue",
//     borderRadius : "50%"

// })

// gsap.from(".h1",{
//     opacity : 0 ,
//     duration : 1,
//     delay : 2,
//     // y : 20
//     x :  20,

//     // stager  chelne one by one jo ki ham time se skte hain 
//     // stagger : 0.5,   // first to last one by one 
//     stagger : -1,   // last to first 
// })


// gsap.to("#container2",{
//     x : 800,
//     duration : 2,
//     delay : 2,
//     rotate : 365,
//     scale : 1,
//     // repeat : 1, // aur yeh 2 times run hoga see !! 

//     repeat : -1, // for inifanite

//     // 
//     yoyo : true // initial  ---> to final ,
//                 //  initial   <-----  final  , like ball bound back to us !! 

// })


// timeline practice 
// gsap.to(".box1",{
//     x : 1000,
//     rotate : 360,
//     duration : 1.5,
//     delay : 2,
//     backgroundColor : "lightpink",
//     borderRadius : "50%"
// })
// // now main chaahta hun ki mera dusra box phle box k animation k bad chale let see 
// gsap.to(".box2",{
//     x : 1100,
//     rotate : 360,
//     duration : 1.5,
//     delay : 3.5 ,
//     backgroundColor : "lightgray",
//     borderRadius : "20%"
// })

// gsap.to(".box3",{
//     x : 1200,
//     scale : 0.90,
//     duration : 1.5,
//     delay : 5.5 ,
//     backgroundColor : "lightgreen",
//     borderRadius : "30%"
// })
   
// that delay duration calculation is difficult lets use timeline 

let timeline = gsap.timeline() 

timeline.to(".box1",{
    x : 1000,
    rotate : 360,
    duration : 1.5,
    delay : 2,
    backgroundColor : "lightpink",
    borderRadius : "50%"
})
// let lets line second 
timeline.to(".box2",{
    x : 1100,
    rotate : 360,
    duration : 1.5,
    // delay : 3.5 , // now in timeline hame delay calculate krne ki jaruta nhi hai 
    backgroundColor : "lightgray",
    borderRadius : "20%"
})

timeline.to(".box3",{
    x : 1200,
    scale : 0.90,
    duration : 1.5,
    // delay : 5.5 , // not need to add delay
    backgroundColor : "lightgreen",
    borderRadius : "30%"
})