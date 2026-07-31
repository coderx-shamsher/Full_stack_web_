import React, { useState } from "react";

const Obj_Arr = () => {
  const [object_, setobject] = useState({ username: "coderx", role: "user" });

  const [arr, setarr] = useState(["kritka", "admin",]);

  const update = () => {
    // using the  seprad operator (...objectname) its the best way to create copy of object and array without tnsn the reff point , means k normaly ager ham kuch esa kre to
    // x = {} or maine y = x krdiya to ager mai y k ander changes krta hun to x ki values bhi chang hongi keoki esa krne se y bhi same value location par point kr raha hai jis par x kr rha hai to es problem ka hal hai (...) operator

    let objectnew = { ...object_ };
    objectnew.username = "admin";
    objectnew.role = "admin";
    setobject(objectnew);
  };

  // array update function 
  const updatearr = () =>{
     let cparr = [...arr]
     cparr[0] = "bob"
     cparr[1] = "user"
     setarr(cparr)
  }
  // batch update values ek bari mein let say mere button k click par value 3 increment ho but kuch ese 
  // setnum(num + 1)
  // setnum(num + 1)
  // setnum(num + 1)

  // ese to nhi hoga but ese ese krna hai 

  // setnum(pre=>(pre + 1))
  // setnum(pre=>(pre + 1))
  // setnum(pre=>(pre + 1))
  // esa krne ka easy or best method -> setnum(num +3 ) 
  return (
    <>
      <div
        style={{
          width: "30rem",
          height: "20rem",
          backgroundColor: "lightblue",
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          marginTop: "5rem",
        }}
      >
        <h3>User is = &gt; {object_.username} </h3>
        <h4>Role = &gt; {object_.role} </h4>
        <button onClick={update}>update user</button>

        {/* array update example  */}
        <h3>User is = &gt; {arr[0]} </h3>
        <h4>Role = &gt; {arr[1]} </h4>
        <button onClick={updatearr}>update user</button>
      </div>
    </>
  );
};

export default Obj_Arr;
