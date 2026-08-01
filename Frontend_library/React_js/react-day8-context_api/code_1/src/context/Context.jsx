import { createContext } from "react";

// maine createContext() hook mein mere contextapi file pass kra or uski help se maine ek Globaldata name ka ek context create kra hai jo ki ek Global context hai ab use koi bhi use kr sakta hai  
// 1) create kr liya context koi usin the createcontext() 

export  let GlobalData =  createContext();


const Context = (props) => {
  console.log(props); 
  return (
  <div>
    {/* 2 context.provider ki hamse hame provide krna hai use or data ese mein declare krna hai */}
       <GlobalData.Provider value={"hello"} >
            {props.children}
       </GlobalData.Provider>

  </div>
)};

export default Context;
