import React, { useState } from "react";

const Users = () => {
  // const [userdata, setuserdata] = useState([{
  //   name: "",
  //   email: "",
  // }]);

  const [userdata, setuserdata] = useState([]);

  function users() {
    fetch("http://localhost:5050/users")
      .then((response) => {
        if (response.ok) {
          console.log("Data received successfully");

          return response.json();
        }
      })
      .then((data) => {
        console.log("data is =>", data);

        // console.log("data is =>", data.usersdata);

        // setuserdata({name : data.username, email:data.email})
        // setuserdata({ ...userdata, name: data.username, email: data.email });

        // for (const element of data.usersdata) {
        //     console.log(element.username);
        //     console.log(element.email);

        // }

        const newUsers = data.usersdata.map((element) => 
        ({
          username: element.username,
          email: element.email,
        }));
        
        // console.log(newUsers);
        // syntax  setdata([...previeousdata, ....newuserdata])

        setuserdata([...userdata, ...newUsers])
      
      })
      .catch((er) => {
        console.log(er);
      });
  }

  console.log(userdata);
  return (
    <div>
      <div> fetch data </div>

      <br />
      <hr />
      <section>
        {userdata.map(user => {
          return (
            <>
              <p>{user.username}</p>

              <div>
                <p>{user.email}</p>
              </div>
            </>
          );
        })
        
        }
      </section>
      
      <br />
      <hr />
      <div className="button">
        <button onClick={users}>fetch users</button>
      </div>
    </div>
  );
};

export default Users;
