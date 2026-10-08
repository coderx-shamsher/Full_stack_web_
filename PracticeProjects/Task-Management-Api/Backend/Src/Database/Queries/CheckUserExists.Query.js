import pool from "../Config/mysql.pool.js";

export const checkUserExistsQuery = async (memberId, res) => {
  try {
    // memberid -> vo user jise hame project members mein add krna hai
    // user || member 
    const [result] = await pool.query(
      `SELECT userId
            FROM users
            WHERE userId = ?`,
      [memberId],
    );
  
    // if user exist then process continue !! 
    if(result.length > 0){
      console.log("-------User Lookup Query Logs  ----------\n");
      console.log("User (member) Exists ✅  -->  \n",result);
      console.log("\n-------User Lookup Logs End ----------\n");
      return;
    }

    // if user not exist ! ->>> 
    if (result.length === 0) {
        console.log("\nUser Not Found Logs -->\n")
        console.log(result)
        console.log("\n --->>User Logs End <<--- \n")
       return res.status(404).json({
        Success: false,
        Message: "User not found",
      });
    }

  } catch (error) {
    console.log("\n------------ Db Error Logs ------------ \n");
    console.log(" ==> DB Error: ", error);
    console.log("\n------------ Db Error Logs ------------ \n");
    // return res.status(500).json({
    //   Success: false,
    //   Message: "Db Error | Server Error ",
    // });
  }
};
