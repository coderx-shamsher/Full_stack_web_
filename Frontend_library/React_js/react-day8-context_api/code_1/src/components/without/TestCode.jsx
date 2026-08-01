import React from "react";
import TestNav from "./TestNav";

const TestCode = (props) => {
  console.log(props);
  console.log(props.theme);
  console.log(props.children);
  {
    /* receiving data from the testmain component */
  }
  return (
    <div>
      {/* sending the data to last test navbar with some data modification  */}
      <TestNav theme={props.theme[0]} />

      {props.children}
      {/* using the children of another component like that  */}

      {/* // updated note-> now maine testcode se kuch new  props and ek another method ka use kra hai jise muje ek yan eksejada childerns get honge joki main es components main use kr skta hun yeh ek component ka concept hai k ham use as pari tag use kr skate hain, how to use -->  */}
    </div>
  );
};

export default TestCode;
