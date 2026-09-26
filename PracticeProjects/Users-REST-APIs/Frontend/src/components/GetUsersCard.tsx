import { useState } from "react";
import './usercard.css'

interface UserObject {
  id: number;
  name: string;
}

const GetUsersCard = () => {
  const [Data, setData] = useState<UserObject[]>([]);

  async function FetchUsers() {
    const response = await fetch("http://localhost:3069/get-users");
    // const data = await response.json();

    const data: UserObject[] = await response.json();
    console.log(data);
    setData(data);
  }

  return (
    <>
      <div
        className="fetch"
        style={{
          paddingTop: "20px",
          paddingLeft: "10px",
          paddingBottom: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "darkslateblue",
            color: "lightgreen",
            padding: "15px",
            borderRadius: "20px",
          }}
          onClick={() => {
            FetchUsers();
          }}
        >
          Fetch users cards
        </button>
      </div>

      
        {Data.map((u) => {
          return (
            <div key={u.id} className="usercard">
              <h2>{" Id "} {u.id}</h2>
              <h3>{"Username "}{u.name}</h3>
            </div>
          );
        })}
  
    </>
  );
};

export default GetUsersCard;
