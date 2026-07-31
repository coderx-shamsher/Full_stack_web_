import React, { useState } from "react";
import Obj_Arr from "./components/Obj_Arr";

const App = () => {
  const [num, setnum] = useState(1);
  const changenum = () => {
    console.log(num);
    setnum(num + 1);
    console.log(num);
  };
  return (
    < >
      <div
        className="counter"
        style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <h2>value = {num} </h2>
        <button onClick={changenum}>click to happened</button>
      </div>

      <div>
        <Obj_Arr />
      </div>
    </>
  );
};

export default App;
