import express from "express";
import pool from "../Db/Server/db.server.connection.js";
import { GetOneUser } from "../Controllers/GetOneUser.query.js";

const GetUsersRouter = express.Router();

GetUsersRouter.get("/get-users", (req, res) => {

  pool.query("select * from usersApi.users", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result[0]);
    res.status(200).json({
      message: "u get alll users",
      result : result
    });
  });
 

  // --> this is testing response <-- 
  // res.status(200).json({
  //    message :"u get alll users"
  // })

});

GetUsersRouter.get('/get-user',(req,res)=>{
    console.log(req.body)
    
    const {email, password} = req.body
    
    GetOneUser(email,password,res)
    
})
export default GetUsersRouter;
