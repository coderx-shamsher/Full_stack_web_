// import gsap from "gsap"

// gsap.to(".main h1",{
//     transform : "translateX(5%)",
//     scrollTrigger : {
//         trigger : ".main h1",
//         scroller : "body",
//         markers : true,
//         start : "top 80%",
//         end : "top 50%"
//     }
// })


/// jab kise child element par animation lagna hai 
// pin propery ko se krna hai toh trigger parent par lagega  
gsap.to(".main h1",{
    transform : "translateX(5%)",
    scrollTrigger : {
        trigger : ".main",
        scroller : "body",
        markers : true,
        start : "top -1%",
        // end : "top 100%",
        end : "top -10%",
        scrub : 3,
        // pin : true
    },
    // yoyo : true

})