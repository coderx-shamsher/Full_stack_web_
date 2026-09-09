// Throttling – “fixed interval pe chalao”
// Events kitne bhi tezi se aayein, function ko har interval ms mein max ek baar hi chalao.
// Beech ke events ignore ho jate hain.

/// use cases : - 
// Scroll events (analytics, lazy loading).
// Resize events (continuous updates).
// Mouse move (drag, parallax).


function throttle(cb,interval){
    let lastcalltimer = 0 

    return function (...args){

        const nowtimer = Date.now()

        if(nowtimer - lastcalltimer >= interval){
            lastcalltimer = nowtimer

            cb.apply(this, args);

        }

    }
}


function scrollhandler(){
    console.log("Scrolll at : ",window.scrollY)
}

function  searchthrottle(event){
   console.log(`user input`, event.target.value)
}

const throttlescroll = throttle(scrollhandler,800)

const searching = throttle(searchthrottle,3000)

window.addEventListener("scroll",throttlescroll)

document.querySelector("#input").addEventListener("input",searching)




/*
Easy analogy:

Debounce: Kisi se baat karte waqt uski baat khatam hone ka wait karna, phir reply dena.
Throttle: Har 5 second mein ek baar reply dena, chahe wo kitna bhi bolta rahe.

*/