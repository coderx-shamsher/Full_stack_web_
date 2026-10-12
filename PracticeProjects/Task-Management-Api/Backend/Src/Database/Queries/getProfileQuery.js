import pool from "../Config/mysql.pool.js";

export async function getProfileQuery(userId, res,next) {
try {
    console.log("USER ID:", userId);

    const [user] = await pool.query(
        `SELECT userId, username, userEmail, role
         FROM users
         WHERE userId = ?`,
        [userId]
    );

    console.log("DB RESULT:", user);

    if (user.length === 0) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user: user[0]
    });

} catch (error) {
  error.context = {
      controller: "GetProfile.Controller.js",
      file: "getProfileQuery.js",
      function: "getProfileQuery ()",
      operation: "User Profile Fetching  Failed !! ",
      layer: "DB Query  ",
    };
    next(error);
}
}
