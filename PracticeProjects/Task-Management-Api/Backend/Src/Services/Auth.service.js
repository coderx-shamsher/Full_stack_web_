import crypto from 'crypto'
import { Login_Query } from '../Database/Queries/Login_Query.js'
import pool from '../Database/Config/mysql.pool.js'


export async function AuthServiceLoginUser(data, res) {

    console.log(data);

    // db call to compare hash with stored password hash 
    // comveting password into hash 
    let hashpassword = crypto.createHash("sha256").update(data.password).digest("hex")
    console.log("\nHash Converted Check ⬆⬆✅ \n", hashpassword, "\n");

    try {
        // db query ->>>> 
        const [passwordmatch] = await pool.query(`SELECT * FROM users where password=?`, [hashpassword])

        // compare both request password hash and stored db password hash 
        if (passwordmatch.length > 0) {
            console.log("\n Password Hash Matched (✅⬆⬆) Now last Login Verfiy..... \n");
            console.log("\n Password Match -->", passwordmatch[0], "\n");
            Login_Query(hashpassword, data, res)

        }

        else {
            // if password not matched 
            console.log("\n Password Hash Not Matched (❌⬇⬇) Login Verfiy Failed..... \n");
            console.log("\n Password Not Matched -->", passwordmatch[0], "\n");
            return res.status(404).json({
                message: "password not match"
            })
        }





    } catch (error) {
        console.log("error ");
        console.log(error);
    }


}