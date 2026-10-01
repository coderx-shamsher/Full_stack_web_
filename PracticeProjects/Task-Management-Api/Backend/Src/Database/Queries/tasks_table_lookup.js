import pool from "../Config/mysql.pool.js";

export async function taskTableLookup() {
  try {
    const result = await pool.query(`select * from tasks`);
    if (result) console.log("\n >> table lookup successful <<\n");
    console.log(result);
  } catch (error) {
    console.log("\nError in lookup table << \n");
    console.log(error);
  }
}
