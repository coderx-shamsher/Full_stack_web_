import pool from "../config/mysql.pool.js";

export async function checkSqlconnection(): Promise<void> {
    let connection;
    try {
        connection = await pool.getConnection()
        await connection.ping()

        console.log("✅ MySQL database connected successfully!");
    } catch (error:unknown) {
        console.error("❌ MySQL database connection failed:", error);
    }finally{
        connection?.release()
    }
}

