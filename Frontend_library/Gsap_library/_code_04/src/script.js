// import gsap from 'gsap'

let timeline = gsap.timeline()


timeline.to(".navitems",{
    top : "10%",
    duration :0.5
})

timeline.from(".navitems h2",{
    y: 50,
    duration : 0.4,
    stagger : 0.2,
    opacity: 0
})
timeline.from(".navitems i",{
    y: 50,
    scale : 1.8,
    opacity: 0
})

//phale mere gsap timeline auto par tha but now main use pause krdiya 
timeline.pause()

let menubtn = document.querySelector(".nav_ul i")
// console.log(menubtn)

menubtn.addEventListener("click",()=>{
    // timeline.resume()
    timeline.play()
    // menubtn.style.opacity = "0"

    gsap.to(menubtn,{
        opacity: 0
    })
})

let close = document.querySelector(".navitems i")
// console.log(close)

close.addEventListener("click",()=>{
    // console.log("closed")
    timeline.reverse() // its cool 
    // timeline.restart()
    
    menubtn.style.opacity = "1"

     gsap.from(menubtn,{
        y: -50,
        opacity: 0,
        duration : 0.8,
        delay : 1,
        scale: 2,
        ease: "back.in"
    })

})