import React, { useContext } from "react";
import { Global_THeme } from "../Context/Theme_Context";

const Change = () => {
  // a
  // let theme_data =  useContext(Global_THeme)
  // console.log(theme_data);

  // array destucturing
  // let [theme, settheme] =  useContext(Global_THeme)

  // updated code -->>>

  let  THEME_data  = useContext(Global_THeme);
  let [setLightTheme, setDarkTheme] = THEME_data
  console.log(THEME_data);
  return (
    <div>
      <div className="change">
        <button
          style={{
            width: "7rem",
            height: "4rem",
            borderRadius: "25px",
            marginTop: "40px",
            marginLeft: "40px",
          }}
          onClick={() => {
            //  settheme("Dark")
            setLightTheme("Light");
          }}
        >
          Light
        </button>
        <button
          style={{
            width: "6rem",
            height: "4rem",
            borderRadius: "25px",
            margin: "40px",
          }}
          onClick={() => {
            setDarkTheme("Dark");
          }}
        >
          Dark
        </button>
      </div>
    </div>
  );
};

export default Change;
