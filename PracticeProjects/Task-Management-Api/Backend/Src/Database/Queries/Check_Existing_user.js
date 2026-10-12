
import pool from "../Config/mysql.pool.js";
import { CreateUserQuery } from "./CreateUserQuery.js";

export async function LookupUser(data,res,next) {
    // let lookup user by email
  const { userId, email } = data;
    
    try {
        const [User] = await pool.query(`SELECT * FROM users WHERE userId=? AND userEmail=?`,[userId,email])

        if(User.length >0){
           console.log("\n >>> User is Already Exists !! <<< \n")
           console.log(User)
           return res.status(409).json({
            Message : 'User email is already exists',
            Success : false
           })
        }

        if(User.length ===0){
            console.log("Need to create this user!!")
        
            // call the create user query here 
            CreateUserQuery(data,res,next)
        }

    } catch (error) {
      error.context = {
      controller: "CreateUser.Controller.js",
      file: "Check_Existing_user.js",
      function: "LookupUser ()",
      operation: "Lookup User  ||  Failed !! ",
      layer: "BackEnd Auth User |  DB Query  ",
    };
    next(error);
    }
}