import pool from "../Config/mysql.pool.js";

export async function getProfileQuery(userId, res) {
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
    console.log("Error fetching user profile:", error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
}
