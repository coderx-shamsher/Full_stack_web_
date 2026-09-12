let txt = document.querySelector(".ul_nav h2").textContent
console.log(txt)

let splittxt = txt.split("")
// console.log(splittxt)

let spantxt = "";
splittxt.forEach((element)=>{
    spantxt += `<span>${element}</span>`
})

document.querySelector(".ul_nav h2").innerHTML = spantxt
// console.log(spantxt)

// gsap animation -code -->> 

gsap.from(".ul_nav h2 span", {
    y: 100,
    duration : 0.5,
    delay : 0.1,
    opacity : 0,
    stagger : 0.2
})