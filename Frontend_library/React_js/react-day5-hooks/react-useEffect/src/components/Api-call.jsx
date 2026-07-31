import React, { useEffect, useState } from "react";
import axios from "axios";
const Api_call = () => {
  const [data, setdata] = useState([]);

  function datafetch() {
    axios
      .get("https://jsonplaceholder.typicode.com/users/")
      //   .then((res)=>console.log(res.data))
      .then((res) => setdata(res.data))
      .catch((err) => console.error(err));
  }

  useEffect(()=>{
     console.log("useEffect chl rha hai");
  },[data])
  // now jab bhi main button par click krta hun api call hoti hai or mere state change hoti hai jiski help se main data print kr raha hun or useEffect chlta hai 
  
  return (
    <div>
      <main
        className=""
        style={{ width: "40rem", height: "30rem", backgroundColor: "skyblue" }}
      >
        {data.map((user) => {
          return (
            <>
              <ul style={{ listStyle: "none", }}>
                <li>{user.username}</li>
                <li>{user.email}</li>
              </ul>
            </>
          );
        })}
      </main>
      <div className="btn">
        <button
          style={{ padding: "20px", marginTop: "10px" }}
          onClick={datafetch}
        >
          get data
        </button>
      </div>
    </div>
  );
};

export default Api_call;
