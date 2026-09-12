// import gsap from "gsap"

let h2 = document.querySelector(".main h2").textContent

let splitedtxt = h2.split(" ")

let firstPart = splitedtxt[0]
let sndPart = splitedtxt[1]


let splitfirstPart = firstPart.split("")
let splitSndPart = sndPart.split("")

// console.log(splitfirstPart)
// console.log(splitSndPart)

// 
let firstPartSnapElements = ""; 
splitfirstPart.forEach(element => {
    // console.log(element)
    firstPartSnapElements = firstPartSnapElements + `<span class="part1"> ${element} </span>`
});

// document.querySelector(".main h2").innerHTML = firstPartSnapElements


let sndPartSpanElement = "";
splitSndPart.forEach((element)=>{
    // console.log(element)
    sndPartSpanElement += `<span class="part2"> ${element} </span>`

})

let finalpart = firstPartSnapElements + " " +  sndPartSpanElement

// console.log(finalpart)
document.querySelector(".main h2").innerHTML = finalpart


gsap.from(".part1",{
    y: 50,
    opacity :0,
    duration : 0.6,
    stagger : 0.15,
    delay : 0.2,
    // ease:"circ.in"
})

gsap.from(".part2",{
    y: 100,
    opacity :0,
    duration : 0.2,
    stagger : -0.15,
    delay : 0.2,
})