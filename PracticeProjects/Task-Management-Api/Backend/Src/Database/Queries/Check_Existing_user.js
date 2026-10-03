
import pool from "../Config/mysql.pool.js";
import { CreateUserQuery } from "./CreateUserQuery.js";

export async function LookupUser(data,res) {
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
            CreateUserQuery(data,res)
        }

    } catch (error) {
    console.error("User check failed:", error);
     return res.status(500).json({
        message: "Internal server error",
        success: false
    });
    }
}