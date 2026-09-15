const main = document.querySelector(".main")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")



main.addEventListener("click",()=>{
    console.log("main bubble ")
})
parent.addEventListener("click",(e)=>{
    console.log("parent bubble ")
    console.log("target :",e.target.id)
    console.log("target :",e.currentTarget.id)
})
child.addEventListener("click",()=>{
    console.log("child bubble ")
})


main.addEventListener('click', () => console.log('main capture'), { capture: true });
parent.addEventListener('click', () => console.log('Parent capture'), { capture: true });
child.addEventListener('click', () => console.log('Child capture'), { capture: true });