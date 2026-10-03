import { AuthServiceLoginUser } from "../../Services/Auth.service.js";
import pool from "../Config/mysql.pool.js";


export async function LookupUserForAuth(data, res) {

    try {
        // db query ->>>> 
        const [User] = await pool.query(`SELECT * FROM users WHERE userId=? AND userEmail=?`, [data.userId, data.email])

        if (User.length > 0) {
            console.log("\n >>> User is Exists (!!....Now Lookup For password..) !! <<< \n")
            // login Auth Service 
            AuthServiceLoginUser(data, res)

        }

        else {
            console.log("\n User Not Exists !! you need to create Account \n")
            console.log(User)
            return res.status(409).json({
                Message: 'User Not Exists ',
                Success: false
            })
        }

    } catch (error) {
        console.error("User check failed:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}