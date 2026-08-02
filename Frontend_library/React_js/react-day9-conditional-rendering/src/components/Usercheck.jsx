
import '../styles/styles.css'
const Usercheck = (user) => {


  let loginusers = ["admin", "user", "coderx", "root"];

  // console.log(user in loginusers);

  if (user === loginusers[0]) {
    return (
      <div className="usergreetcard">
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
      </div>
    );
  }
  if (user === loginusers[1]) {
    return (
      <div className="usergreetcard">
        <>
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
        </>
      </div>
    );
  }
  if (user === loginusers[2]) {
    return (
      <div className="usergreetcard">
        <>
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
        </>
      </div>
    );
  }
  if (user === loginusers[3]) {
    return (
      <div className="usergreetcard">
        <>
          <p className="text"> Wellcome !!</p>
          <p className="text">User = {user} </p>
        </>
      </div>
    );
  } else {
    return (
      <div className="usergreetcard">
        <>
          <p className="text_wrong_user"> Something is wrong !!</p>
          <p className="text_wrong_user">User = {user} </p>
        </>
      </div>
    );
  }
};

export default Usercheck;
