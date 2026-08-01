import React, { useContext } from "react";
import { Global_THeme } from "../Context/Theme_Context";
import Change from "./Change";

const Navbar = () => {
  // now use the context api , using the useContext() , pass the Global_theme jo ki hamra context hai
  let [theme] = useContext(Global_THeme);
//   console.log(theme_data);

  return (
    <div>
      <header className={theme}
        style={{
          width: "full",
          height: "4rem",
          borderRadius: "40px",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "40px",
            paddingRight: "40px",
            paddingTop: "18px",
            color: "black",
            listStyle: "none",
          }}
        >
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>{theme}</li>
        </ul>
      </header>

       
    </div>
  );
};

export default Navbar;
