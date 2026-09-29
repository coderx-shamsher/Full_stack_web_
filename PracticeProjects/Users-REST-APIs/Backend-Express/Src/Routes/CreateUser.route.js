import express from "express";
import pool from "../Db/Server/db.server.connection.js";

const CreateUserRouter = express.Router();

// express.json()

CreateUserRouter.get("/create-users", (req, res) => {
  res.status(200).json({
    message: "users get /create-user endpoint it working.....",
  });
});

CreateUserRouter.post("/create-users", (req, res) => {
  let user = req.body;

  console.log(
    "\n<<-- user Request body data -->> \n",
    user,
    "\n<<--End of the user Request data-->>",
  );

  //   let checkoutuser = `select * from users where userId='${user.userId}' and email='${user.email}' `;

  // checkout the exiting users ?
  let checkoutuser = `select * from users where userId = ? and email = ? `; //-- fixing vulerabilty
  pool.query(checkoutuser, [user.userId, user.email], (err, userexits) => {
    if (err) {
      console.log("Error checking user:", err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (userexits.length > 0) {
      console.log("\nUser is Exists -> \n", userexits, "\n");
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // -->

    //  query for getting stucture of users table ->
    // pool.query('DESC users',(err,result)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log(result)
    // })

    // <--

    // User doesn't exist
    // -->>>> user inserting code block -->>>>
    try {
      let insertquery =
        " INSERT INTO users(userId,username,email,password) VALUES (?,?,?,?)";

      pool.query(
        insertquery,
        [user.userId, user.username, user.email, user.password],
        (err, result) => {
          if (err) {
            console.log("Error: (Failed to Create User) !! -> ", err);
          } else {
            console.log("\n Data inserted <<_User is Created_>> \n");
            console.log(result, "\n");
            res.status(201).json({
              message: "User is created SuccessFully !!",
            });
          }
        },
      );
    } catch (error) {
      console.log("Error IN Catch block ->", error);
    }
  });
});

export default CreateUserRouter;
