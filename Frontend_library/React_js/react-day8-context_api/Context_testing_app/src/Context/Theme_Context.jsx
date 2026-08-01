import React, { createContext, useState } from "react";

export let Global_THeme = createContext();
const Theme_Context = (props) => {
  const [LightTheme, setLightTheme] = useState("Light");
  const [DarkTheme, setDarkTheme] = useState("Dark");

  return (
      <div>
        {/* first hamne hamare GlobalTHeme.Provider component create kra hai 
           2nd hamne value attribute/prop mein hamara theme and settheme as props set kra hai  
        */}

     <Global_THeme.Provider value={[LightTheme,setLightTheme,DarkTheme,setDarkTheme]}> 
      {/*  /rendering the children component of Theme_Context's child component (jo ki mera app component hai jise hamne Theme_Context se wrap kra hai..)   so hamne props ki help se props.children ki help se use render kr liya.. */}
      {props.children}
    
     </Global_THeme.Provider>
     

    </div>
  );
};

export default Theme_Context;
