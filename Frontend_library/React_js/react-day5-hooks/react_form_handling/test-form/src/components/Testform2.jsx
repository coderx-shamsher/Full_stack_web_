import React, { useState } from "react";

const Testform2 = () => {
  const [user, setuser] = useState(""); // inital value empty

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setuser(""); // setuser empty esliye kra tn ki jab form submit ho to form reset ho sake..

        }}
      >
        <input
          type="text"
          placeholder="enter your username"
          value={user}
          onChange={(e) => {
            // let usernames = {
            //     username : e.target.value
            // } 
            // console.log(usernames);
            setuser(e.target.value);
            console.log(e.target.value);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Testform2;

// 1) now two way binding kuch nhi ek concept hai jo ki vohi batt krta hai ki website se direct intract na krk ham react ka use kre let see

// 2)  create state with empty string value

// 3) now ager main value property mein user variable jo ki mera state hai use show krta hun to
// jaise he maine set kra value koi to main kuch bhi type nhi kr pa raha ? kiya console par print ho rha hai kuch , onchange laga kr check krte hain on this input
//             muje values dekht to rahia hai but render nhi ho rhai keoki value ek readonly propertie hai use change nhi krde directly kaise karna hai

// 4) using the state setuser() method ! ok ok
// i -> jaise he pass ne yeh line code kri to      setuser(e.target.value) hame input par hamara type kiya gya har char show hoga
// or now values pahele jaise console hongi .. 

// or yehi two way binding hai..... means hamne react state ki help say form koi handle kiya 