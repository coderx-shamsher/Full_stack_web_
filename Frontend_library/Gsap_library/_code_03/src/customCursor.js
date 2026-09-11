// import gsap from "gsap"
let main = document.querySelector(".main")
let cursor = document.querySelector(".cursor")
let imgDiv = document.querySelector(".pic")


// mousemove 
main.addEventListener("mousemove",(moveevents)=>{
    // console.log("mouse moving y", moveevents.y)
    // console.log("mouse moving x", moveevents.x)
    gsap.to(cursor,{
        x : moveevents.x,
        y : moveevents.y,
        ease : "back.out"
    })

})

imgDiv.addEventListener("mouseenter",()=>{
    console.log("wk")
    gsap.to(cursor,{
      scale : 4,
      // changing the backGround color 
      backgroundColor : "lightpink"
      
    })

})
imgDiv.addEventListener("mouseleave",()=>{
    console.log("wk")
    gsap.to(cursor,{
        scale : 1
    })

})


// document.body.addEventListener("mousemove",(moveevents)=>{
//     // console.log("mouse moving y", moveevents.y)
//     // console.log("mouse moving x", moveevents.x)
   
//     gsap.to(cursor,{
//         x : moveevents.x,
//         y : moveevents.y,
//         ease : "back.out"
//     })

// })




