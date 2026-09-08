// 1 get all the li's using the same class i given 
let items = document.querySelectorAll(".item")

// checkout 
console.log(items) 



items.forEach((li) =>{
     li.addEventListener("click",()=>{
         console.log("Clicked => ", li.textContent)
         li.style.backgroundColor = "lightblue"
     })
})

// Har <li> pe alag listener.
// Agar list dynamic hai (naye items add hote hain), toh unpe bhi alag se listener lagana padega.


// with delegation 

// const ul = document.querySelector(".list")
// console.log(ul)




// ul.addEventListener('click', (e)=>{
//     const li = e.target.closest(".item") 
//     if(!li) return "item not founded" 
//     console.log("Clicked :", li.textContent)
//     li.style.backgroundColor = "lightpink"
// })

// dono ki working same he lag rahi hai so i dont know k kiya main differ hai ? 
