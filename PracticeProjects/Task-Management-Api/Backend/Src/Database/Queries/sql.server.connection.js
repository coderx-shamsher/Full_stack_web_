import pool from "../Config/mysql.pool.js";

async function sqlConnection() {
  try {
    const connection = await pool.getConnection();
    if (connection) {
      console.log(`Database (Mysql) Connection Up and Running`);
      connection.release();
    }
  } catch (error) {
    console.log("\nDb Error Connection Failed DB Down !!\n");
    console.log(error);
  }
}


export default sqlConnection