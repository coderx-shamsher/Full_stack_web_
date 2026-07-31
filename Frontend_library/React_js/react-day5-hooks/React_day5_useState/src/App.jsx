import React, { useState } from 'react'
import Counter from './components/Counter'

const App = () => {
  // let _x_ = 10
 
  // yeh hai usestate ka syntax -> 
  //      ⬇️   yeh hai variable jo ki read only variable hai jise ham sirf read kr sakte hain.
  const [a, seta] = useState(10)

  //             ⬆️ yeh hai write only variable jise ham change kr sakte hai sirf change  = usestate(initial value jo ki kuch bhi ho skati hai )
 


   const [User, setUser] = useState("coderx")

  return (
    <>
    
      {/* <h2>This is the default value = {_x_} </h2>
      <button  
        onClick={()=>{
          console.log(_x_);
           _x_ ++ 
          console.log(_x_);

        }}
       >click to change </button>  */}
    
     {/* now main chahta hun ki button k click par value change ho.. usk liye maine ek function lihka  */}


     <hr />
     {/* <div>
           <h3>the usestate testing = {a}</h3>
           <button 
            onClick={()=>(
              seta(20)
            )}
            >click me</button>
     </div>
   
     <div>
          <h3>user is = {User}</h3>
          <button onClick={()=>{
              setUser("admin")   
          }} 
          >change user </button>

     </div> */}

     <div>
          <Counter /> 

     </div>

    </>
  )
}

export default App