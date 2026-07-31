import React, { useState } from "react";
import { useEffect } from "react";
const Test = () => {


    const [num, setnum] = useState(0)
  
  // now useEffect  
  //  1) jab bhi koi component rerender hota hai yeh function chlega 
//   useEffect(()=>{
//      console.log("useEffect chl rha hai ");
//   })
 // 2) jab jab main num ki value increament kr rha hun useeffect chl rha hai or chlta he rehga har r-render par 

 // NOte -> ager use har re-render par nhi chlna hai to use ek dependency array pass krdu 
//  useEffect(()=>{
//      console.log("useEffect chl rha hai ");
//   },[])
  // now jab bhi main state change krta hun useEffect run hhi hota 
  // NOTE-> but ek bar run hoga par now state change hone par run nhi hoga..
 
  // 3) now ager main chaahta hun ki jab jab mere num ki value change ho tab tab run ho useeffect
 // means ham states bana sakte hain or jab koi ek state run hogi useEffect chlega.. 

 // to better understand make one more state 

 const [user, setuser] = useState("user")

   useEffect(()=>{
     console.log("useEffect chl rha hai ");
    //  fna()
  },[num])

// now ager main change user krta hun to useeffect nhi chlta but ager mai num koi change krta hun to state change hoti hai or useeffect chlta hai 
// denpendency array mai jo state koi pass krte hain uske change hone par he useffect ka code run hota hai bs yehi hai sala kehl 

  return (
    <>
      {/* <h3>Check the console </h3> */}
      <hr />
      <h4>{num}</h4>
      <button onClick={()=>{
        setnum(num + 1 )
      }}>num change </button>
      <hr />
      <h4>{user}</h4>
      <button onClick={()=>{
        setuser(user + 1 )
      }}> user change </button>
    </>
  );
};

export default Test;
