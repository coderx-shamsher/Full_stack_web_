// Debouncing – “wait till activity stops”
// Idea:
// Jab events bahut tezi se aa rahe hon (jaise typing), toh har event pe function mat chalao.
// Instead, har event pe timer reset karo, aur jab events ruk jayein for delay ms, tab function chalao. 


// Use cases: 
// Search input (API call sirf jab user type karna band kare).
// Window resize (layout calculation sirf resize end pe).
// Button double-click prevention.


function Debouncing(fnc,delay){
    let timer ;

    return (...arg)=>{
         clearTimeout(timer)

        timer = setTimeout(()=>{
            fnc(...arg)
        }, delay)
    }
}


function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId); // purana timer cancel
    timeoutId = setTimeout(() => {
      fn.apply(this, args);  // original function call
    }, delay);
  };
}

function handleSearch(e) {
  console.log('Search for:', e.target.value);
  // API call yahan
}

// let resultshow = () =>{
//     console.log("Wait searching results in db.....")
// }

let input = document.querySelector("#search")

// input.addEventListener("input",Debouncing(resultshow,400))
input.addEventListener("input",debounce(handleSearch,400))