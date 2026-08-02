import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from "./components/Card";
import Test_render from "./components/Test_render";
import Usercheck from "./components/Usercheck";

function App() {
  const [user, setuser] = useState([]);

  function userinput() {
    let user = prompt("enter your username");
    return user;
  }

  return (
    <>
      <div
        style={{
          paddingTop: "20px",
          marginBottom: "40px",
        }}
      >
        <button
          onClick={() => {
            let user = userinput();
            setuser(user);
          }}
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "lightsteelblue",
            color: "yellow",
            fontSize: "20px",
          }}
        >
          check user !
        </button>
      </div>

      {Usercheck(user)} 
      {/* rendering the function jismein hamne logic likha hai k kiya render hoga  */}
    </>
  );
}

export default App;
