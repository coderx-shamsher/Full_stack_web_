import React from "react";

const App = () => {
  // first run server run and checkout in -> inspect mode -> application -> storage -> first par he hoga localstorage

  // 1) ager koi data localstorage mein hai to lets clear
  //  localStorage.clear() // es method se sari localstorage values clean ho jati hai

  // 2) set new localstorage vales -> or yeh values key-value pair mein hoti hai but in string-object data type like "key":"value" that
  // -setItem() method to set pair
  // localStorage.setItem("username", "testadmin");
  // localStorage.setItem("role", "admin");

  // ager console par check krna hai to console kro

  // remove items
  // ismein key name pass kro aur that's it
  // localStorage.removeItem("role");

  // console.log(localStorage.getItem("username")); //

  // ager key nhi hogi to error ayega

  // object mein data hoga to use kaise set krna hai
  const users = {
    user0: {
      username: "testuser01",
    },
    user1: {
      username: "archadmin",
    },
    user2: {
      username: "parrot0x",
    },
    user3: {
      username: "ubuntu",
    },
    user4: {
      username: "test01",
    },
    user5: {
      username: "kali01",
    },
    user6: {
      username: "testadmin",
    },
  };
 
  const test = {
     username1 : "testadmin0x",
     user1role : "admin",
     username2 : "admin0x",
     user2role :  "admin"
   }

  // localStorage.clear()
  // localStorage.removeItem("username")
  // keoki localstorage mein ham string mein data store krte hain using the setitem method or yeh ek object hai 
  localStorage.setItem("test", JSON.stringify(test))
  localStorage.setItem("users", JSON.stringify(users))

  // console.log(localStorage.getItem("users")); 
 
  // now ager ese firse convert krna hai to let use the json.parse() 
  // let user = localStorage.getItem("users")
  // console.log(JSON.parse(user));

  // or you can use ->
  console.log(JSON.parse(localStorage.getItem("users")));
  return (
    <>
      <h2>hello it about the local storage in browser</h2>
    </>
  );
};

export default App;
