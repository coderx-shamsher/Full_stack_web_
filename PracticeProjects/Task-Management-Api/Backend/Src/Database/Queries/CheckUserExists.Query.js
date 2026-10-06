import pool from "../Config/mysql.pool.js";

export const checkUserExistsQuery = async (memberId, res) => {
  try {
    // memberid -> vo user jise hame project members mein add krna hai
    const [result] = await pool.query(
      `SELECT userId
            FROM users
            WHERE userId = ?`,
      [memberId],
    );

    console.log("-------User Exists  Logs  ----------\n");
    console.log("User (member) Exists -->  \n",result);
    console.log("\n-------User Exists End ----------\n");

    if (result.length === 0) {
        console.log("\nUser Not Found Logs -->\n")
        console.log(result)
        console.log("\n --->> End Logs <<--- \n")
      return res.status(404).json({
        Success: false,
        Message: "User not found",
      });
    }
  } catch (error) {
    console.log("\n------------ Db Error Logs ------------ \n");
    console.log(" ==> DB Error: ", error);
    console.log("\n------------ Db Error Logs ------------ \n");
    return res.status(404).json({
      Success: false,
      Message: "Db Error | Server Error (user/member not found)",
    });
  }
};
