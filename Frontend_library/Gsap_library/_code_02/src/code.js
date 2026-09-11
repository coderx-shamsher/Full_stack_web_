// import gsap from "gsap"

let initalpath = `M 10 100 Q 200 100 480 100`

let finalpath = `M 10 100 Q 500 100 990 100`


let parentstring = document.querySelector("#string")

// first test mouse
parentstring.addEventListener("mousemove",function(event){
    
    // console.log(" mouse entered",event)
   
    // initalpath = `M 10 100 Q 500 ${event.y} 990 100`

    // changing the x axis values with y  
    initalpath = `M 10 100 Q ${event.x} ${event.y} 990 100`
   
    gsap.to("svg path",{
        // attr -> for changing the attribute of the svg in that case attr ko ek key value pass krni hai mere ka name jo bhi attribute hai for exmple mera attribute hai d in svg path
        attr: {d : initalpath },
        duration : 0.2,
        ease :"power3.out"
    })

})

parentstring.addEventListener("mouseleave",function(){
    gsap.to("svg path",{
       attr : {
         d : finalpath
       },
       duration : 1.5,
       ease : "elastic.out(1,0.2)"
    })
   
})

