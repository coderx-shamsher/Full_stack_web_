
// gsap.from("#page1 .box",{
//     opacity : 0,
//     rotate : 360,
//     delay : 1.5,
//     duration : 2
// })


// gsap.from("#page2 .box",{
//     opacity : 0,
//     rotate : 360,
//     delay : 1.5,
//     duration : 2
// })

// here is the problem k second page animation tab nhi chl raha taab main second page par jaun!, 
// jab main page par ata hun tab vo animation chlna chaahie.. ! main yeh krna chaahta hun. 

// scroll based animations hame krna hai 

// gsap.from("#page1 .box",{
//     opacity : 0,
//     rotate : 360,
//     delay : 1.5,
//     duration : 2
// })

// // main chahta hun k mere page 2 ki animation mere page 2 par ate he suru ho phle yan bad mein nhi let do 

// gsap.from("#page2 .box",{
//     opacity : 0,
//     rotate : 360,
//     // delay : 1.5,
//     duration : 2,
//     // now use the scrollTrigger : "give your element like #page2 .box"  this is the most kam chlaou way 

//     // scrollTrigger  : "#page2 .box"
//     scrollTrigger :  {
//         trigger : "#page2 .box",
//         // trigger is the starting point 
//         scroller : "body",  // we mostly use it
//         markers : true,  // start and end point show krta hai 
//         start : "top 50%"
//     }
// })

// element k pass bhi start or end point hota hai jab hame markers ko true krte hain to show hoga !, or jab hamnein start koi top 50% set kra to page ka start page k 50% pe set hoga scroller start point , 
// jab page ka scroller start point element k start point se hit krega to animation run hoga 

// gsap.from(".main h1", {
//     opacity: 0,
//     duration : 1,
//     x: -800,
//     scrollTrigger : {
//         trigger : ".main h1",
//         scroller : "body",
//         markers : true,
//         start : "top 50%"
//     },
// })
// gsap.from(".main h2", {
//     opacity: 0,
//     duration : 1,
//     x: 800,
//     scrollTrigger : {
//         trigger : ".main h2",
//         scroller : "body",
//         markers : true,
//         start : "top 80%"
//     },
// })


// animation based on the scroll 
gsap.from("#page2 .box",{
    rotate : 720,
    duration : 1,
    opacity : 0 ,
    scale : 0,
    scrollTrigger : {
         trigger : "#page2 .box",
         scroller : "body",
         markers : true, 
         start : "top 45%" ,
         end : "top 10%",
        //  scrub : true, // we can also give boolean value true but usse animation smooth nhi hota 
         scrub : 2, // we can also give boolean value true but usse animation smooth nhi hota 
         // ham animated element ko end point par pin bhi kr skte hain using the pin property 
         pin : true

    }
})