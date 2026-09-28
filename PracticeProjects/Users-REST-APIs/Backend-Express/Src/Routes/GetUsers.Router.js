import express from "express";
import pool from "../Db/Server/db.server.connection.js";

const GetUsersRouter = express.Router();

GetUsersRouter.get("/get-users", (req, res) => {

  pool.query("select * from usersApi.users", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result[0]);
    res.status(200).json({
      message: "u get alll users",
      result : result[0]
    });
  });
 

  // --> this is testing response <-- 
  // res.status(200).json({
  //    message :"u get alll users"
  // })

});

export default GetUsersRouter;
