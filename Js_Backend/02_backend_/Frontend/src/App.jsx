import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setuser] = useState([]);
  
  function getdata(){
    axios.get('/api/users')
    .then((Response)=>{
       setuser(Response.data)
    })
    .catch((err)=>{
       console.log(err);
       console.error(err);
    })
  }



  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Full stack Test App</h1>
          <p>
            <em>
              This is Fronend with Backend how to connect frontend with backend
              its a full stack kind of practice
            </em>
          </p>
        </div>
        <div id="Usersection">
          <h2>Users 👋</h2>

          {
            user.map((user) => {
              return (
                <section key={user.id}>
                  <h2> Username = {user.username}</h2>
                  {
                    user.admin === true ? <p><strong>Admin User</strong></p> : "Normal user"
                  }
                </section>
              )
            })
          }

        </div>

        <button
          type="button"
          className="counter"
          onClick={getdata}
        >
          fetch data 
        </button>
      </section>
      <section id="spacer"></section>
    </>
  );
}

export default App;
