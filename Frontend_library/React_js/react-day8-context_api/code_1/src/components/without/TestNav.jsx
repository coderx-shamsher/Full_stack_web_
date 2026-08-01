import React from "react";

const TestNav = (theme) => {
  // receiving the props from the testcode
//   console.log(theme);
  return (
    <div>
      {/* let show case the data */}
      <h3 style={{
        color : "goldenrod"
      }}>
        This data from the Testmain -&gt; from testcode -&gt; to this testNav
        component the data is 
      </h3>
        <b style={{
            fontSize : "40px"
        }}>{theme.theme}</b>
    </div>
  );
};

export default TestNav;
