import pool from "../Config/mysql.pool.js";

export async function Login_Query(hashedpassword, data, res) {
    try {

        // console log the request data 
        // console.log(data.email)
        // console.log(data.password)
        // console.log(hashedpassword);
     
        // db query ->>>> 
        const [result] = await pool.query(`SELECT * FROM users WHERE password=? AND userEmail=?`, [hashedpassword, data.email])

        if (result.length > 0) {
            console.log("\n User Login Success (password and email checked ✅) \n");
            console.log("\n User Detail -> ", result[0], "\n");

            return res.status(200).json({
                Message: "Login SuccessFully.... ✅🚀",
                user: result[0]
            })
        }

        else {
            console.log("\n User Login Failed (password and email invaild ❌‼️) \n");
            console.log("\n User Detail -> ", result, "\n");

            return res.status(200).json({
                Message: "User Login Failed...... ⬇️❌",
            })
        }


    } catch (error) {
        console.log("\n Error in Login user ⬇️❌‼️");
        console.log(error);
    }
}

