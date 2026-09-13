
// 1) change the props with interface object 
interface User {
    Username : string,
    Email : string,
    isAdmin : boolean
}

const UserCard = (user : User) => {
  return (
    <>
      <div style={{
       color : "darkgoldenrod",
       fontSize : "40px",
       paddingBottom : "30px"
      }}>UserCard</div>

      <div>
        <h2>{" UserName -> "}
          {user.Username}{" "}
          {user.isAdmin ? <span> 👤 Admin User </span> : <span> 💻 User </span>}
        </h2>
      </div>

      <div>
        <h3> {user.Email} </h3>
      </div>
    </>
  );
};

export default UserCard;
