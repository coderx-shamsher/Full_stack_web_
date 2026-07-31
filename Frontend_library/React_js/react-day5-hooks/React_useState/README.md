## React app setup 

```sh

❯ npm create vite 

❯ npm install --ignore-scripts && npm clean-install

```


## Advance useState
- synchronous/Asynchronous js in useState code examples and explainations 

```jsx 
import React, { useState } from 'react'

const App = () => {
  const [num, setnum] = useState(1)

  const changenum = () =>{
    setnum(num + 1 )  
    
    console.log(num); 
   
  }



  return (
    <>
      
      <div className="counter" style={{display:"flex",gap:"50px", justifyContent:"center" }}>
       <h2>value = {num} </h2> 
       <button onClick={changenum}
       >click to happened</button>
      </div>
    
    </>
  )
}

export default App

```

## Sync / Async js 

       now setnum mein jo value set kri hai vo render hogi but ager ham console par num ko print krenge to kiya hoga kiya value update hogi honi to chaahie keoki hamne setnum method ka use kra hai lets see 
      but yeh to update hone k bad bhi muje previous initialized value he show kr rha hai ager man increament krta hun to for example meri value hai 1 default toh maine update kia value 1 se increase hoyi hai but console par muje abhi bhi 1 he show hoga jab ki view mein muje 2 show ho rha  hai !! kiya  yeh kiya bak rhe ho ??? 
        jab jab increament krte jate ho console ki value hamre website rendered value se -1 means ek step peche he hoti hai asa keo !!  
     
  
##  js do trah se kam krti haai first  -> synchronous js -> means code line by line print hoga example --> 
   
        console.log("hello its  first ");
        console.log("hello its  second ");
        console.log("hello its  3rd ");
        console.log("hello its  4th  ");

        --> yeh hai example code keo ki hamra code line by line chala ! esa to nhi hai k 3, 4 yah or koi pahle chala jaise main console krna vese he print huya 

        console.log("hello its  3rd ");
        console.log("hello its  first ");
        console.log("hello its  second ");
        console.log("hello its  4th  ");

        --> ager maine order change kr diya to now keoki code line by line means synchronously he chlta hai by default to vese he chala hai ese he kehta hai synchronous js jo ki line by line code ko run krti hai .. just like that ok 
        ager ek function pahle call kra hai to baki uske badd he chalenge keo? keoki its sync js abh ager koi function ki calculation chaahie kitni bhi kam time mein puri ho usse fark nhi pardta pahla function pana kam katam krega to baki chlenge 


 ## Asynchronous js -> means js dekhta hai jo task jab bhi apna calculation done krta hai to vo he pahale run hoga jo  fark nhi parta k vo last mein hai yan example k liye man lo ke 2 fncs hai ek fnc 10s leta hai or ek 6s to ko pahle run hoga let see 


    fnc1() --> 10s 
    fnc2() --> 6s 


    >> -- sync js jo pahle call hoga 
    
    fnc1() 
    fnc2() 
    
    >> async js jo pahle task complete krna hai (less time mean vo) vo run hoga pahle 
    
    fnc1()
    
    fnc2() --> async mein fnc2 he pahle run hoga keoki vo kamm time mein task complete kr rha hai or tab tak vo task (fnc1) apni calculation kr rha hai to tab tak baki code wait nhi krta vo run hota hai or jab fnc1 ki calculation done hogi vo bhi chl jyega 
 
    now yehi cheej hai keoki setnum method ek async method hai to console par vo bad mein esilye ho rha hai , keoki setnum koi ui mein render krne mein time lag raha hai or hhamen console par usi time value print krni chaahi , ui mein value late ayi to vo same value koi match nhi kr paya console liye usne previous value he show krdi or jab next increament kra to same cheej repeat hoyi.
   
    setnum ui mein value render to ho gyi but kuch time laga to console ko pta nhi laga ki value update huyi hai k nhi liye previous value point kr rha hai 

    ager ham setnum koi num value he set krde to react rerender nhi krega button k click par , ager same cheej repeat ho rhi hai to kiya button k click par new value set ho rahi hai ? ager nhi purani value he hai to rerender nhi hoga 

- ham usestate ki help se arrays and objects koi change krna dekhte hain 
